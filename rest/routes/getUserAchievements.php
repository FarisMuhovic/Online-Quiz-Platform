<?php 

require '../services/UserService.class.php';

if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $userService = new UserService();
  $result = $userService->getAchievements($id);
  header('Content-Type: application/json');
  echo json_encode($result);
} else {
  echo json_encode(array('error' => 'No user email provided'));
}
