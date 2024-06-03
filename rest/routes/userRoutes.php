<?php 

require_once __DIR__ . '/../services/UserService.class.php';
require_once __DIR__ . '/../utils/authMiddleware.php';

Flight::set('userService', new UserService());

Flight::group('/users', function () {
    /**
     * @OA\Get(
     *      path="/users",
     *      tags={"users"},
     *      summary="Get all users",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of users"
     *      )
     * )
     */
    Flight::route('GET /', function () {
        $result = Flight::get('userService')->getAllUsers();
        Flight::json($result, 200);
    });
     /**
     * @OA\Get(
     *      path="/users/achievements",
     *      tags={"users"},
     *      summary="Get specific user achievements by ID",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of achievements"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="string"), in="query", name="id", example="fa245808-6d07-4630-84d9-aebbb57fdb3e", description="User ID")
     * )
     */   
    Flight::route('GET /achievements', function () {
        $ID = Flight::request()->query['id'];
        if($ID) {
            $result = Flight::get('userService')->getAchievements($ID);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No user id provided'), 400);
        }
    });
    /**
     * @OA\Get(
     *      path="/users/leaderboard",
     *      tags={"users"},
     *      summary="Get top 10 users for the leaderboard in descending order",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of users"
     *      )
     * )
     */
    Flight::route('GET /leaderboard', function () {
        $result =  Flight::get('userService')->getLeaderboard();
        Flight::json($result, 200);
    });
     /**
     * @OA\PUT(
     *      path="/users/updateRole",
     *      tags={"users"},
     *      summary="Change role of the user",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully updated the role."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to update the role."
     *      ),
     *      @OA\RequestBody(
     *          description="Set role (user or admin) and user ID",
     *          @OA\JsonContent(
     *             required={"userID", "role"},
     *             @OA\Property(property="userID", type="string", example="fa245808-6d07-4630-84d9-aebbb57fdb3e"),
     *             @OA\Property(property="role", type="string", example="user"),
     *          )
     *      ),
     * )
     */
    Flight::route('PUT /updateRole', function () {
        $data = Flight::request()->data->getData(); 
        if (isset($data['userID']) && isset($data['role'])) {
            $ID = $data['userID'];
            $role = $data['role'];
            $result = Flight::get('userService')->changeUserRole($ID, $role);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No userID or role provided in the request body'), 400);
        }
    });
    
     /**
     * @OA\PUT(
     *      path="/users/updateAvatar",
     *      tags={"users"},
     *      summary="Change avatar of the user",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully updated the avatar."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to update the avatar."
     *      ),
     *      @OA\RequestBody(
     *          description="Set avatar and user ID",
     *          @OA\JsonContent(
     *             required={"userID", "avatar"},
     *             @OA\Property(property="userID", type="string", example="fa245808-6d07-4630-84d9-aebbb57fdb3e"),
     *             @OA\Property(property="avatar", type="number", example="1"),
     *          )
     *      ),
     * )
     */
    Flight::route('PUT /updateAvatar', function () {
        $data = Flight::request()->data->getData(); 
        $ID = $data["userID"];
        $clickedAvatar = $data["clickedAvatar"];
        if ($ID && $clickedAvatar) {
            $result =  Flight::get('userService')->changeUserAvatar($clickedAvatar,$ID);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No avatar provided'), 400);
        }
    });
     /**
     * @OA\POST(
     *      path="/users/updateInformation",
     *      tags={"users"},
     *      summary="Change information of the user",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully updated the information."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to update the information."
     *      ),
     * )
     */
    Flight::route('POST /updateInformation', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('userService')->changeUserInfo($requestData);
            Flight::json($result, 200);
          } else {
            Flight::json(array('error' => 'No info provided'), 400);
        }          
    });
     /**
     * @OA\Delete(
     *      path="/users/remove",
     *      tags={"users"},
     *      summary="Remove an user from the system.",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Successfully removed an user."
     *      ),
     *      @OA\Response(
     *           response=400,
     *           description="Failed to remove an user."
     *      ),
     *      @OA\Parameter(@OA\Schema(type="string"), in="query", name="userID", example="765909b0-7297-4c62-ae90-0bdd41a596be", description="User ID")
     * )
     */
    Flight::route('DELETE /remove', function () {
        $ID = Flight::request()->query['userID'];
        if($ID) {
            $result = Flight::get('userService')->removeUser($ID);
            Flight::json($result, 200);
        } else {
            Flight::json(array('error' => 'No user ID provided'), 400);
        }        
    });
    
    Flight::route('GET /role', function () {
        $role = Flight::get("jwt")->user->role;
        if ($role == "admin") {
            Flight::json(['message' => 'Admin access granted'], 200);
        } else {
            Flight::json(['message' => 'User access granted'], 200);
        }
    });
}, [new authMiddleware()]);