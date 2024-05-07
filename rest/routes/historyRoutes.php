<?php 

require_once __DIR__ . '/../services/HistoryService.class.php';

Flight::set('historyService', new HistoryService());

Flight::group('/history', function () {
    Flight::route('GET /all', function () {
        $ID = Flight::request()->query['id']; // user id
        if($ID) {
            $result = Flight::get('historyService')->getQuizHistory($ID);
            Flight::json($result);
          } else {
            Flight::json(array('error' => 'No id provided'));
          }
    });

    Flight::route('POST /id', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $userID = $requestData['id'];
            $quizID = $requestData['quizID'];
            $result = Flight::get('historyService')->getQuizHistoryByID($userID, $quizID);
            Flight::json($result);
          } else {
            Flight::json(array('error' => 'No id provided'));
          }
          
    });

    Flight::route('POST /new', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('historyService')->insertHistory($requestData);
            Flight::json($result);
          }  else {
            header('HTTP/1.1 400 Bad Request');
            Flight::json(array('error' => 'No quiz info provided'));
          }
    });
});