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
}