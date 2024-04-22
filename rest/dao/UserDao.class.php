<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class UserDao extends BaseDao {

  public function __construct() {
    parent::__construct("user");
  }
  public function getAllUsers() {
    return $this->query("SELECT user_id, lastName, firstName, role, email, joinDate FROM user;", []);
  }

  public function removeUser($userID) {
    try {
        $query = "DELETE FROM user WHERE user_id = :userID";
        $params = [':userID' => $userID];
        
        $this->execute($query, $params);
        return true;
    } catch (PDOException $e) {
        // Handle any exceptions
        echo "Error: " . $e->getMessage();
        return false;
    }
  }
  public function changeUserRole($userID, $newRole) {
      try {
          $query = "UPDATE user SET role = :newRole WHERE user_id = :userID";
          $params = [
              ':newRole' => $newRole,
              ':userID' => $userID
          ];
            
          $this->execute($query, $params);
          return true;
        } catch (PDOException $e) {
          // Handle any exceptions
          echo "Error: " . $e->getMessage();
          return false;
      }
    }
  public function getUserAchievements($userEmail) {
    return $this->query("select a.title, a.description FROM user_achievements u JOIN achievement a ON a.achievement_id = u.user_achievement_id JOIN user usr ON usr.user_id = u.user_id WHERE usr.email = :email", ["email" => $userEmail]);
  }
  public function changeUserAvatar($avatar, $email) {
    $query = "UPDATE user SET avatar = :avatar WHERE email = :email";
    $params = [
        ':avatar' => $avatar,
        ':email' => $email
    ];

    $result = $this->execute($query, $params);
    return $result->rowCount() > 0; // Return true if any rows were updated.
}
  public function changeUserInfo($payload){ 
    $query = "UPDATE user SET firstName = :firstName, lastName = :lastName, dateOfBirth = :dateOfBirth, country = :country WHERE email = :email";
    $params = [
      ':firstName' => $payload["firstName"],
      ':lastName' => $payload["lastName"],
      ':dateOfBirth' => $payload["dateOfBirth"],
      ':country' => $payload["country"],
      ':email' => $payload["email"], 
    ];

    $result = $this->execute($query, $params);
    return $result->rowCount() > 0; // Return true if any rows were updated.
  }
  public function getLeaderboard() {
    return $this->query("select u.firstName, u.lastName, u.avatar , us.points , us.totalAttempts,
    us.scienceAttempts , us.mathematicsAttempts, us.historyAttempts, us.literatureAttempts, us.geographyAttempts, us.languagesAttempts, us.sportsAttempts, us.musicAttempts, us.moviesAttempts
    FROM user u JOIN user_stats us ON u.user_id = us.user_stats_id order by(us.points) DESC LIMIT 10", []);
  }
  public function insertHistory($payload) {
    $result = $this->query_unique("SELECT user_id FROM user WHERE email = :email", ["email" => $payload["email"]]);
    $userID = $result['user_id'];

    $quizInfo = $payload["takenQuiz"];
    $query = "INSERT INTO quiz_history (user_id, quiz_id, title, dateTaken, timeTaken, category, amountOfQuestions, correctAnswers)
    VALUES (:userId, :quizId, :title, :dateTaken, :timeTaken, :category, :amountOfQuestions, :correctAnswers)";

    $params = array(
        ':userId' => $userID,
        ':quizId' => $quizInfo["id"],
        ':title' => $quizInfo["title"],
        ':dateTaken' => date('Y-m-d'), 
        ':timeTaken' => $quizInfo["timeTaken"],
        ':category' => $quizInfo["category"],
        ':amountOfQuestions' => $quizInfo["questionCount"],
        ':correctAnswers' => $quizInfo["correctAnswers"]
    );

    $this->execute($query, $params);
    
    $quizHistoryID = $this->connection->lastInsertId();

    foreach ($quizInfo["answers"] as $answer) {
        $responseQuery = "INSERT INTO response (quiz_history_id, questionName, isCorrect)
                          VALUES (:quizHistoryId, :questionName, :isCorrect)";
        $responseParams = array(
            ':quizHistoryId' => $quizHistoryID,
            ':questionName' => $answer["questionName"],
            ':isCorrect' => $answer["isUserCorrect"]
        );
        $this->execute($responseQuery, $responseParams);

        // Get response ID
        $responseID = $this->connection->lastInsertId();

        // Insert answer data into answer table
        foreach ($answer["fields"] as $field) {
            $userAnswer = implode(", ", $answer["userAnswer"]);
            $answerQuery = "INSERT INTO answer (response_id, text)
                            VALUES (:responseId, :text)";
            $answerParams = array(
                ':responseId' => $responseID,
                ':text' => $userAnswer
            );
            $this->execute($answerQuery, $answerParams);

            // Get answer ID
            $answerID = $this->connection->lastInsertId();

            $isCorrect = $field["correct"] == "true" ? "true" : "false";
            $answerFieldQuery = "INSERT INTO answer_field (response_id, title, isCorrect)
                                 VALUES (:responseId, :title, :isCorrect)";
            $answerFieldParams = array(
                ':responseId' => $responseID,
                ':title' => $field["title"],
                ':isCorrect' => $isCorrect
            );
            $this->execute($answerFieldQuery, $answerFieldParams);
        }
    }
    return true;
  }
}