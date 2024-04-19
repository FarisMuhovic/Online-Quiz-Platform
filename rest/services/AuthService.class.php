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
        // if user is created return true else return false
        if ($isUserCreated) {
          // create new tables for achievement history, quiz history and statistics.
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
        // filter out password from return query and return user data
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