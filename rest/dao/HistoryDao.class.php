<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class HistoryDao extends BaseDao {

  public function __construct() {
    parent::__construct("quiz_history");
  }

  public function getQuizHistory($id) {
    $query = "
    select qh.id as quiz_history_id,qh.dateTaken, qh.timeTaken, qh.correctAnswers, q.title, q.description, q.category, q.numberOfQuestions, q.id from quiz_history qh 
    JOIN quiz q ON q.id = qh.quiz_id 
    WHERE user_id = :id";
    return $this->query($query, ["id" => $id]);
  }

  public function getQuizHistoryByID($id, $quiz_id) {
    $query1 = "
    select q.title, q.category, qh.correctAnswers, q.numberOfQuestions, qh.id as quiz_history_id, q.id as quiz_id
    from quiz_history qh
    JOIN quiz q ON q.id = qh.quiz_id
    where qh.user_id = :userid and qh.id = :quizid";

    $quizHistoryData = $this->query_unique($query1, ["userid" => $id, "quizid" => $quiz_id]);

    if (!$quizHistoryData) {
        return null; 
    } else {
      $query2 = "
      select ans.title, ans.isCorrect, ans.quiz_answer_id, qa.id from quiz_history qh
      JOIN quiz_answer qa ON qh.id = qa.quiz_history_id
      JOIN answer ans ON ans.quiz_answer_id = qa.id
      WHERE qh.id = :id";
      $quizHistoryData["answers"] = $this->query($query2, ["id" => $quizHistoryData["quiz_history_id"]]);
      return $quizHistoryData;
    }
  }

  public function insertHistory($payload) {
    $quizInfo = $payload["takenQuiz"];

    $query = "INSERT INTO quiz_history (quiz_id, user_id, timeTaken, correctAnswers)
              VALUES (:quiz_id, :user_id, :timeTaken, :correctAnswers)";
        
    $params = array (
        ':quiz_id' => $quizInfo["quizID"],
        ':user_id' => $quizInfo["userID"],
        ':timeTaken' => $quizInfo["timeTaken"],
        ':correctAnswers' => $quizInfo["correctAnswers"],
    );
    $this->execute($query, $params);
    $quizHistoryID = $this->connection->lastInsertId(); 

    foreach ($quizInfo["answers"] as $answer) {
        $query2 = "INSERT INTO quiz_answer (quiz_history_id)
                   VALUES (:quiz_history_id)";
        
        $params2 = array (
            ':quiz_history_id' => $quizHistoryID,
        );
        $this->execute($query2, $params2);
        $quiz_answer = $this->connection->lastInsertId();

        if (isset($answer["userAnswer"]) && is_array($answer["userAnswer"])) {
            foreach($answer["userAnswer"] as $field) {
                $query3 = "INSERT INTO answer (quiz_answer_id, title, isCorrect)
                           VALUES (:quiz_answer_id, :title, :isCorrect)";
        
                $params3 = array (
                    ':quiz_answer_id' => $quiz_answer,
                    ':title' => $field["title"],
                    ':isCorrect' => $field["isCorrect"] == "true" ? 1 : 0, 
                );
                $this->execute($query3, $params3);
            }
        } else {
          $query3 = "INSERT INTO answer (quiz_answer_id, title, isCorrect)
          VALUES (:quiz_answer_id, :title, :isCorrect)";
          $params3 = array (
              ':quiz_answer_id' => $quiz_answer,
              ':title' => null,
              ':isCorrect' => 0, 
            );
          $this->execute($query3, $params3);
      }
    }
  }
}