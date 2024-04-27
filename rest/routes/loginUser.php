<?php 

require '../services/AuthService.class.php';
header('Content-Type: application/json');

$authService = new AuthService();
$payload = $_REQUEST;
$result =  $authService->loginUser($payload);

if ($result == true) {
  header('HTTP/1.1 200 OK');
  echo json_encode(array(
      'success' => true,
      'message' => 'Logged in successfully!',
      'data' => $result
  ));
} else {
  header('HTTP/1.1 401 Unauthorized');
  echo json_encode(array(
      'success' => false,
      'message' => 'Authentication failed.'
  ));
}