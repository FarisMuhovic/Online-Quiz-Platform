<?php 

require '../services/HistoryService.class.php';

if(isset($_POST["takenQuiz"])) {
  $history = new HistoryService();
  header('HTTP/1.1 200 OK');
  echo json_encode($history->insertHistory($_POST));
}  else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No quiz info provided'));
}