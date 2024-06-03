<?php 

require_once __DIR__ . '/../services/HistoryService.class.php';
require_once __DIR__ . '/../utils/authMiddleware.php';

Flight::set('historyService', new HistoryService());

Flight::group('/history', function () {
    /**
     * @OA\Get(
     *      path="/history/all",
     *      tags={"history"},
     *      summary="Get all taken quizzes",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of taken quizzes"
     *      )
     *      @OA\RequestBody(
     *          description="User credentials",
     *          @OA\JsonContent(
     *             required={"id"},
     *             @OA\Property(property="id", type="string", example="fa245808-6d07-4630-84d9-aebbb57fdb3e"),
     *          )
     *      ),
     * )
     */
    Flight::route('GET /all', function () {
        $ID = Flight::request()->query['id']; // user id
        if($ID) {
            $result = Flight::get('historyService')->getQuizHistory($ID);
            Flight::json($result, 200);
          } else {
            Flight::json(array('error' => 'No id provided'), 400);
          }
    });
     /**
     * @OA\Post(
     *      path="/history/id",
     *      tags={"history"},
     *      summary="Get specific quiz history based on that history ID and that user",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully retrieved taken quiz."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to retrieve taken quiz."
     *      ),
     *      @OA\RequestBody(
     *          description="Information about user and quiz history ID",
     *          @OA\JsonContent(
     *             required={"quizID", "id"},
     *             @OA\Property(property="quizID", type="number", example="3"),
     *             @OA\Property(property="id", type="string", example="fa245808-6d07-4630-84d9-aebbb57fdb3e"),
     *          )
     *      ),
     * )
     */
    Flight::route('POST /id', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $userID = $requestData['id'];
            $quizID = $requestData['quizID'];
            $result = Flight::get('historyService')->getQuizHistoryByID($userID, $quizID);
            Flight::json($result, 200);
          } else {
            Flight::json(array('error' => 'No id provided'), 400);
          }
          
    });
     /**
     * @OA\Post(
     *      path="/history/new",
     *      tags={"history"},
     *      summary="Save quiz after the user has done it.",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully saved taken quiz."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to save the taken quiz."
     *      ),
     * )
     */
    Flight::route('POST /new', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('historyService')->insertHistory($requestData);
            Flight::json($result, 200);
          }  else {
            header('HTTP/1.1 400 Bad Request');
            Flight::json(array('error' => 'No quiz info provided'), 400);
          }
    });
}, [new authMiddleware()]);