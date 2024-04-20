<?php 

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
  private $userDao;

  public function __construct() {
    $this->userDao = new UserDao();
  }
  public function getAchievements($userEmail) {
    return $this->userDao->getUserAchievements($userEmail);
  }
  public function changeUserAvatar($avatar, $email){
    return $this->userDao->changeUserAvatar($avatar , $email);
  }
  public function changeUserInfo($payload){
    return $this->userDao->changeUserInfo($payload);
  }
  
}