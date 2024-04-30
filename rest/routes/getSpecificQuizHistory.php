<?php

require '../services/HistoryService.class.php';

if(isset($_POST['id']) && isset($_POST['quizID'])) {
  $historyService = new HistoryDao();
  $userID = $_POST['id'];
  $id = $_POST['quizID'];
  $result = $historyService->getQuizHistoryByID($userID, $id);
  header('Content-Type: application/json');
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No id and quiz id provided'));
}
