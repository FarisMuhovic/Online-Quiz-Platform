<?php 

require '../services/QuizService.class.php';


if(isset($_POST['quiz'])) {
  $quizService = new QuizService();
  $result = $quizService->insertQuiz($_POST['quiz']);
  header('HTTP/1.1 200 OK');
  echo json_encode($result);
}  else {
  header('HTTP/1.1 400 Bad Request');
  echo json_encode(array('error' => 'No avatar provided'));
}