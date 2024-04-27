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
  public function getAchievements($userEmail) {
    return $this->userDao->getUserAchievements($userEmail);
  }
  public function changeUserAvatar($avatar, $email){
    return $this->userDao->changeUserAvatar($avatar , $email);
  }
  public function changeUserInfo($payload){
    return $this->userDao->changeUserInfo($payload);
  }
  public function getLeaderboard() {
    return $this->userDao->getLeaderboard();
  }
  public function insertHistory($payload) {
    return $this->userDao->insertHistory($payload);
  }
}