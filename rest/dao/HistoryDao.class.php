<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class HistoryDao extends BaseDao {

  public function __construct() {
    parent::__construct("quiz_history");
  }
  public function getQuizHistory($email) {
    $query = "
    select qh.quiz_history_id, qh.category,qh.title, qh.dateTaken, qh.timeTaken, qh.amountOfQuestions, qh.correctAnswers, u.user_id,qz.quiz_id from quiz_history qh 
    JOIN user u ON qh.user_id = u.user_id JOIN quiz qz ON qz.title = qh.title WHERE u.email = :email";
    return $this->query($query, ["email"=> $email]);
  }
  public function getQuizHistoryByID($email, $quiz_id) {
    // Step 1: Retrieve quiz history data
    $quizHistoryData = $this->query_unique("SELECT quiz_history_id, quiz_id, user_id, title, dateTaken, timeTaken, category, amountOfQuestions, correctAnswers FROM quiz_history WHERE quiz_id = :quizId AND user_id = (SELECT user_id FROM user WHERE email = :email)", ["quizId" => $quiz_id, "email" => $email]);

    if (!$quizHistoryData) {
        return null; // No quiz history found for the given email and quiz_id
    }

    // Step 2: Retrieve responses for the quiz history
    $responses = $this->query("SELECT response_id, questionName, isCorrect FROM response WHERE quiz_history_id = :quizHistoryId", ["quizHistoryId" => $quizHistoryData['quiz_history_id']]);

    // Step 3: Iterate over responses and retrieve associated answers and answer fields
    foreach ($responses as &$response) {
        $response['answers'] = $this->query("SELECT text FROM answer WHERE response_id = :responseId", ["responseId" => $response['response_id']]);
        $response['answerFields'] = $this->query("SELECT title, isCorrect FROM answer_field WHERE response_id = :responseId", ["responseId" => $response['response_id']]);
    }

    // Step 4: Add responses to quiz history data
    $quizHistoryData['responses'] = $responses;

    // Step 5: Convert array to object
    $quizHistoryObject = (object) $quizHistoryData;

    return $quizHistoryObject;
}


}