<?php 

require '../services/UserService.class.php';

if(isset($_GET['email'])) {
  $email = $_GET['email'];
  $userService = new UserService();

  $result = $userService->getAchievements($email);
  echo json_encode($result);
} else {
  echo json_encode(array('error' => 'No user email provided'));
}
