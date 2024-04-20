<?php 

require '../services/QuizService.class.php';
$quizService = new QuizService();

$result =  $quizService->getAllQuizBanners();
echo json_encode($result);