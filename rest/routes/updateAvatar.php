<?php

require '../services/UserService.class.php';
$userService = new UserService();

if(isset($_POST['clickedAvatar'])&&isset($_POST['email'])) {
  $clickedAvatar = $_POST['clickedAvatar'];
  $email = $_POST['email'];
  $result = $userService->changeUserAvatar($clickedAvatar,$email);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No avatar provided'));
}

