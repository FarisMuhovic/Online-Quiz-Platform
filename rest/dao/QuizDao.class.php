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
  public function insertQuiz($quiz) {
    try {
        // Insert quiz data into the 'quiz' table
        $query = "INSERT INTO quiz (title, description, category, bannerImage, altText, duration, numberOfQuestions, dateCreated)
                  VALUES (:title, :description, :category, :bannerImage, :altText, :duration, :numberOfQuestions, NOW())";
        $params = [
            ':title' => $quiz['title'],
            ':description' => $quiz['description'],
            ':category' => $quiz['category'],
            ':bannerImage' => $quiz['bannerImage'],
            ':altText' => $quiz['altText'],
            ':duration' => $quiz['quizLength'],
            ':numberOfQuestions' => count($quiz['questions'])
        ];
        $this->execute($query, $params);

        // Get the auto-generated quiz ID
        $quizId = $this->connection->lastInsertId();

        // Insert each question and its fields into the 'question' and 'question_field' tables
        foreach ($quiz['questions'] as $question) {
            $this->insertQuestion($quizId, $question);
        }

        return true;
    } catch (PDOException $e) {
        // Handle any exceptions
        echo "Error: " . $e->getMessage();
        return false;
    }
}

private function insertQuestion($quizId, $question) {
    // Insert question data into the 'question' table
    $query = "INSERT INTO question (title, type, quiz_id)
              VALUES (:title, :type, :quizId)";
    $params = [
        ':title' => $question['questionName'],
        ':type' => $question['typeOfQuestion'],
        ':quizId' => $quizId
    ];
    $this->execute($query, $params);

    // Get the auto-generated question ID
    $questionId = $this->connection->lastInsertId();

    // Insert each field of the question into the 'question_field' table
    foreach ($question['fields'] as $field) {
        $this->insertQuestionField($questionId, $field);
    }
}

private function insertQuestionField($questionId, $field) {
    // Insert field data into the 'question_field' table
    $query = "INSERT INTO question_field (title, isCorrect, question_id)
              VALUES (:title, :isCorrect, :questionId)";
    $params = [
        ':title' => $field['text'],
        ':isCorrect' => $field['isCorrect'],
        ':questionId' => $questionId
    ];
    $this->execute($query, $params);
}
  public function getQuizById($ID) {
    $quizData = $this->query_unique("SELECT id, title, description, category, duration, numberOfQuestions FROM quiz WHERE id = :id", ["id" => $ID]);

    $resultArray = (array) $quizData; // Convert object to array
    $resultArray['questions'] = $this->query(
        "SELECT q.title, q.type, q.id,
        GROUP_CONCAT(CONCAT(qf.title, '<.>', qf.isCorrect) SEPARATOR '|') AS fields
        FROM question q 
        JOIN question_field qf ON qf.question_id = q.id 
        WHERE q.quiz_id = :id
        GROUP BY q.title, q.type, q.id;", ["id" => $ID]
    );
    // $resultArray['questions'] = $this->query(
    //   "SELECT 
    //       q.title, 
    //       q.type, 
    //       GROUP_CONCAT(qf.title) as fieldNames, 
    //       GROUP_CONCAT(qf.isCorrect) as isCorrect
    //   FROM 
    //       question q
    //   JOIN 
    //       question_field qf ON q.question_id = qf.question_id
    //   WHERE 
    //       q.quiz_id = :id
    //   GROUP BY 
    //       q.title, 
    //       q.type",["id" => $ID]);

    // Convert back to object 
    $resultObject = (object) $resultArray;  
    return $resultObject;
  }
  public function removeQuiz($quizID) {
    try {
      $query = "DELETE FROM quiz WHERE quiz_id = :quizID";
      $params = [':quizID' => $quizID];
      
        $this->execute($query, $params);
        return true;
    } catch (PDOException $e) {
        // Handle any exceptions
        echo "Error: " . $e->getMessage();
        return false;
    }
  }
}