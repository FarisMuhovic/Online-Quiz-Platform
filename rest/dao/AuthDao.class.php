<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class AuthDao extends BaseDao {

  public function __construct() {
    parent::__construct("user");
  }
  public function insertUser($user) {
    try {
      $query = "INSERT INTO user (email, password, firstName, lastName, role, category, avatar, joinDate) 
      VALUES (:email, :password, :firstName, :lastName, :role, :category, :avatar, :joinDate)";
      $params = array(
          'email' => $user['email'],
          'password' => $user['password'],
          'firstName' => $user['firstName'],
          'lastName' => $user['lastName'],
          'role' => "user",
          'category' => $user['userType'],
          'avatar' => "avatar1",
          'joinDate' => date('Y-m-d'),
      );
      $this->execute($query, $params);
      return true;
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      return false;
  }
  }
  public function getUserByEmail ($email) {
    return $this->query_unique("SELECT * FROM user WHERE email = :email", ["email" => $email]);
  }
}