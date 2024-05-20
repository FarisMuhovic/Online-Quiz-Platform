<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class UserDao extends BaseDao {

  public function __construct() {
    parent::__construct("user");
  }

  public function getAllUsers() {
    return $this->query("SELECT id, age, lastName, firstName, role, email, joinDate FROM user;", []);
  }

  public function removeUser($userID) {
    try {
        $query = "DELETE FROM user WHERE id  = :userID";
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
          $query = "UPDATE user SET role = :newRole WHERE id = :userID";
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

  public function getUserAchievements($id) {
    $query = "
      SELECT a.title, a.description, a.banner FROM achievement a 
      JOIN user_achievement ua ON a.id = ua.achievement_id 
      JOIN user u ON u.id = ua.user_id 
      WHERE u.id = :id";

    return $this->query($query, ["id" => $id]);
  }

  public function changeUserAvatar($avatar, $userID) {
    $query = "UPDATE user SET avatar = :avatar WHERE id = :id";
    $params = [
        ':avatar' => $avatar,
        ':id' => $userID
    ];

    $result = $this->execute($query, $params);
    return $result->rowCount() > 0;
  }

  public function changeUserInfo($payload){ 
    $query = "UPDATE user SET firstName = :firstName, lastName = :lastName, dateOfBirth = :dateOfBirth, country = :country, age = :age WHERE id = :id";
    $params = [
      ':id' => $payload["id"], 
      ':firstName' => $payload["firstName"],
      ':lastName' => $payload["lastName"],
      ':dateOfBirth' => $payload["dateOfBirth"],
      ':country' => $payload["country"],
      ':age'=> $payload["age"],
    ];

    $result = $this->execute($query, $params);
    return $result->rowCount() > 0;
  }
  
  public function getLeaderboard() {
    $query = "
      select * from user u 
      JOIN user_stats us ON u.id = us.user_id 
      JOIN user_attempts ua ON us.id = ua.id 
      ORDER BY us.points DESC 
      LIMIT 10";
    return $this->query($query, []);
  }
}