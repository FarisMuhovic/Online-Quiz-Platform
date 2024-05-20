<?php 

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
  private $userDao;

  public function __construct() {
    $this->userDao = new UserDao();
  }

  public function getAllUsers() {
    return $this->userDao->getAllUsers();
  }

  public function removeUser($userID){
    return $this->userDao->removeUser($userID);
  }

  public function changeUserRole($userID, $newRole) {
    return $this->userDao->changeUserRole($userID, $newRole);
  }

  public function getAchievements($id) {
    return $this->userDao->getUserAchievements($id);
  }
  
  public function changeUserAvatar($avatar, $userID){
    return $this->userDao->changeUserAvatar($avatar , $userID);
  }

  public function changeUserInfo($payload){
    return $this->userDao->changeUserInfo($payload);
  }
  
  public function getLeaderboard() {
    return $this->userDao->getLeaderboard();
  }
}