<?php

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php';

class AuthDao extends BaseDao {

  public function __construct() {
    parent::__construct("user");
  }

  public function insertUser($user) {
    try {
      $query = "INSERT INTO user (id, email, password, firstName, lastName, role, category, avatar)
                VALUES
                  (:id, :email, :password, :firstName, :lastName, :role, :category, :avatar)";
      $params = array(
          'id' => $user["id"],
          'email' => $user['email'],
          'password' => $user['password'],
          'firstName' => $user['firstName'],
          'lastName' => $user['lastName'],
          'role' => "user",
          'category' => $user['userType'],
          'avatar' => $user['avatar'],
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