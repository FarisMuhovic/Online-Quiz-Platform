<?php 

require '../services/QuizService.class.php';

if(isset($_GET['quizID'])) {
    $quizID = $_GET['quizID'];
    $quizService = new QuizService();

    $result = $quizService->getQuizByID($quizID);
    echo json_encode($result);
} else {
    echo json_encode(array('error' => 'No quiz ID provided'));
}

