<?php 

require '../services/QuizService.class.php';


if($_GET["quizID"]) {
    $quizService = new QuizService();

    $result = $quizService->removeQuiz($_GET["quizID"]);
    echo json_encode($result);
} else {
    echo json_encode(array('error' => 'No quiz ID provided'));
}

