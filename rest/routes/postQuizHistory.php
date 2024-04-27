<?php 

require '../services/UserService.class.php';


if(isset($_POST["takenQuiz"])) {
  $userHistory = new UserService();
  $result = $userHistory->insertHistory($_POST);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
}  else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No quiz info provided'));
}