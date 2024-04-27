<?php

require '../services/HistoryService.class.php';

if(isset($_POST['email']) && isset($_POST['quizID'])) {
  $historyService = new HistoryDao();
  $email = $_POST['email'];
  $id = $_POST['quizID'];
  $result = $historyService->getQuizHistoryByID($email, $id);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No email provided'));
}
