<?php 

require_once __DIR__ . '/../dao/AuthDao.class.php';

class AuthService {
  private $authDao;

  public function __construct() {
    $this->authDao = new AuthDao();
  }

  public function registerUser($payload) {
    $email = $payload["email"];
    $result = $this->authDao->getUserByEmail($email);
    if ($result == false) {
      $isUserCreated = $this->authDao->insertUser($payload);
      if ($isUserCreated) {
        return $isUserCreated;
      }  
      return $result;
      } else {
        return $result;
      }
  }
  public function loginUser($payload) {
    $email = $payload["email"];
    $password = $payload["password"];
    $result = $this->authDao->getUserByEmail($email);
    if ($result == false) {
      return $result;
    } else {
      if ($result["password"] == $password) {
        unset($result["password"]);
        return $result;
      } else {
        return 0;
      }
    }
  }
  // this will be implemetented if we do sessions
  public function logoutUser() {}
  public function checkSession() {}
}