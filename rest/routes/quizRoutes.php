<?php 

require_once __DIR__ . '/../services/QuizService.class.php';
require_once __DIR__ . '/../utils/authMiddleware.php';

Flight::set('quizService', new QuizService());

Flight::group('/quiz', function () {
    /**
     * @OA\Get(
     *      path="/quiz/all",
     *      tags={"quiz"},
     *      summary="Get all quizzes",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of quizzes"
     *      )
     * )
     */
    Flight::route('GET /all', function () {
        $result =  Flight::get('quizService')->getAllQuizBanners();
        Flight::json($result, 200);
    });
    /**
     * @OA\Get(
     *      path="/quiz/id",
     *      tags={"quiz"},
     *      summary="Get a quiz by id",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Object of that quiz"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="quizID", example="3", description="Quiz ID")
     * )
     */
    Flight::route('GET /id', function () {
        $ID = Flight::request()->query['quizID'];
        if($ID) {
            $result = Flight::get('quizService')->getQuizByID($ID);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No quiz ID provided'), 400);
        }
    });
     /**
     * @OA\Post(
     *      path="/quiz/new",
     *      tags={"quiz"},
     *      summary="Create a new quiz.",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully created the quiz."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to create the quiz."
     *      ),
     * )
     */
    Flight::route('POST /new', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('quizService')->insertQuiz($requestData["quiz"]);
            Flight::json($result, 200);
          }  else {
            Flight::json(array('error' => 'No avatar provided'), 400);
          }
    });
    /**
     * @OA\Delete(
     *      path="/quiz/remove",
     *      tags={"quiz"},
     *      summary="Removes a quiz from the database by quizID",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Quiz successfuly removed"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="query", name="quizID", example="3", description="Quiz ID")
     * )
     */
    Flight::route('DELETE /remove', function () {
        $ID = Flight::request()->query['quizID'];
        if($ID) {
            $result = Flight::get('quizService')->removeQuiz($ID);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No quiz ID provided'), 400);
        }        
    });
}, [new authMiddleware()]);