<?php

require '../services/HistoryService.class.php';
$historyService = new HistoryDao();

if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $result = $historyService->getQuizHistory($id);
  header('Content-Type: application/json');
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
} else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No id provided'));
}
