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
    return $result->rowCount() > 0; 
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
    return $result->rowCount() > 0; 
  }
  public function getLeaderboard() {
    return $this->query("select u.firstName, u.lastName, u.avatar , us.points , us.totalAttempts,
    us.scienceAttempts , us.mathematicsAttempts, us.historyAttempts, us.literatureAttempts, us.geographyAttempts, us.languagesAttempts, us.sportsAttempts, us.musicAttempts, us.moviesAttempts
    FROM user u JOIN user_stats us ON u.user_id = us.user_stats_id order by(us.points) DESC LIMIT 10", []);
  }
  public function insertHistory($payload) {
    $quizInfo = $payload["takenQuiz"];

    // Insert quiz history
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

    // Iterate over answers
    foreach ($quizInfo["answers"] as $answer) {
        // Insert answer
        $query2 = "INSERT INTO answer (title, isCorrect)
                   VALUES (:title, :isCorrect)";
        
        $params2 = array (
            ':title' => $answer["questionName"],
            ':isCorrect' => isset($answer["userAnswer"]) ? $answer["userAnswer"][0]["isCorrect"] : null,
        );
        $this->execute($query2, $params2);
        $answerID = $this->connection->lastInsertId();

        // Insert quiz answer
        $query3 = "INSERT INTO quiz_answer (answer_id, quiz_history_id)
                   VALUES (:answer_id, :quiz_history_id)";
        
        $params3 = array (
            ':answer_id' => $answerID,
            ':quiz_history_id' => $quizHistoryID,
        );
        $this->execute($query3, $params3);
    }
  }

}