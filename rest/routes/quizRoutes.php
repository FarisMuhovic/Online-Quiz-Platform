<?php 

require_once __DIR__ . '/../services/QuizService.class.php';

Flight::set('quizService', new QuizService());

Flight::group('/quiz', function () {
    Flight::route('GET /all', function () {
        $result =  Flight::get('quizService')->getAllQuizBanners();
        Flight::json($result);
    });

    Flight::route('GET /id', function () {
        $ID = Flight::request()->query['quizID'];
        if($ID) {
            $result = Flight::get('quizService')->getQuizByID($ID);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No quiz ID provided'));
        }
    });

    Flight::route('POST /new', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('quizService')->insertQuiz($requestData["quiz"]);
            Flight::json($result);
          }  else {
            Flight::json(array('error' => 'No avatar provided'));
          }
    });

    Flight::route('GET /remove', function () {
        $ID = Flight::request()->query['quizID'];
        if($ID) {
            $result = Flight::get('quizService')->removeQuiz($ID);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No quiz ID provided'));
        }        
    });
});