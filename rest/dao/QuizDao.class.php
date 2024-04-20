<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class QuizDao extends BaseDao {

  public function __construct() {
    parent::__construct("quiz");
  }
  public function getAllQuizBanners() {
    return $this->query("SELECT * FROM quiz", []);
  }
  public function getQuizById($ID) {
    $quizData = $this->query_unique("SELECT quiz_id, title, description, category, duration, numberOfQuestions FROM quiz WHERE quiz_id = :id", ["id" => $ID]);

    $resultArray = (array) $quizData; // Convert object to array
    $resultArray['questions'] = $this->query(
      "SELECT 
          q.title, 
          q.type, 
          GROUP_CONCAT(qf.title) as fieldNames, 
          GROUP_CONCAT(qf.isCorrect) as isCorrect
      FROM 
          question q
      JOIN 
          question_field qf ON q.question_id = qf.question_id
      WHERE 
          q.quiz_id = :id
      GROUP BY 
          q.title, 
          q.type",["id" => $ID]);

    // Convert back to object 
    $resultObject = (object) $resultArray;  
    return $resultObject;
  }
}