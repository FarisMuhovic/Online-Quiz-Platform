<?php 

require '../services/QuizService.class.php';
$quizService = new QuizService();

header('Content-Type: application/json');
$result =  $quizService->getAllQuizBanners();
echo json_encode($result);