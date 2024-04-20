<?php

require '../services/UserService.class.php';
$userService = new UserService();

if($_POST) {
  $result = $userService->changeUserInfo($_POST);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No info provided'));
}

