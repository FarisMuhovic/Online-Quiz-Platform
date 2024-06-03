<?php 

require_once __DIR__ . '/../dao/AuthDao.class.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService {
  private $authDao;

  public function __construct() {
    $this->authDao = new AuthDao();
  }

  public function registerUser($payload) {
    $email = $payload["email"];
    $result = $this->authDao->getUserByEmail($email);
    if ($result == 0) {
      $payload["password"] = password_hash($payload["password"], PASSWORD_BCRYPT);
      $isUserCreated = $this->authDao->insertUser($payload);
      if (!$isUserCreated) {
        return 0;
      } else {
        $jwt_payload = [
          'user' => $result,
          'iat' => time(),
          'exp' => time() + 60 * 60 * 24 // 1 day
        ];
        $token = JWT::encode($jwt_payload, Config::JWT_SECRET(), 'HS256');
        $payload["token"] = $token;
        return $payload;
      }
    } else {
      return 0;
    }
  }
  
  public function loginUser($payload) {
    $email = $payload["email"];
    $password = $payload["password"];
    $isRememberTrue = $payload["rememberMe"];
    $result = $this->authDao->getUserByEmail($email);
    if ($result == 1) {
      return 0;
    } else {
      if (password_verify($password, $result["password"])) {
        unset($result["password"]);
        $exp = time() + 60 * 60 * 24;
        if ($isRememberTrue == "true") {
          $exp += 60 * 60 * 24 * 2; // 1 + 2 days
        }
        $jwt_payload = [
          'user' => $result,
          'iat' => time(),
          'exp' => $exp
        ];
        $token = JWT::encode($jwt_payload, Config::JWT_SECRET(), 'HS256');
        $result["token"] = $token;
        return $result;
      } else {
        return 0;
      }
    }
  }

  public function logoutUser($token) {
    try {
      $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
      return true;
    } catch (\Exception $e) {
      Flight::halt(401, $e->getMessage());
    }
  }
}