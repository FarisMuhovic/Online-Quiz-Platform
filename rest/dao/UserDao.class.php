<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class UserDao extends BaseDao {

  public function __construct() {
    parent::__construct("user");
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
}