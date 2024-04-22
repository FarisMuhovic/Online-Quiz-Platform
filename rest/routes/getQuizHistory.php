<?php

require '../services/HistoryService.class.php';
$historyService = new HistoryDao();

if(isset($_GET['email'])) {
  $email = $_GET['email'];
  $result = $historyService->getQuizHistory($email);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No email provided'));
}
