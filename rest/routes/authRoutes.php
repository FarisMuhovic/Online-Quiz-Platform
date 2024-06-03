<?php 

require_once __DIR__ . '/../services/AuthService.class.php';
require_once __DIR__ . '/../utils/authMiddleware.php';

Flight::set('authService', new AuthService());

Flight::group('/auth', function () {
    /**
     * @OA\Post(
     *      path="/auth/register",
     *      tags={"auth"},
     *      summary="Register into the system",
     *      @OA\Response(
     *           response=200,
     *           description="User information"
     *      ),
     *      @OA\Response(
     *           response=401,
     *           description="Failed authentication"
     *      ),
     *      @OA\RequestBody(
     *          description="User credentials",
     *          @OA\JsonContent(
     *             required={"firstName","lastName","email", "password", "userType", "id", "role", "avatar"},
     *             @OA\Property(property="firstName", type="string", example="Faris"),
     *             @OA\Property(property="lastName", type="string", example="Muhovic"),
     *             @OA\Property(property="email", type="string", example="faris.dsfg@ibu.edu.ba"),
     *             @OA\Property(property="password", type="string", format="password", example="123456789"),
     *             @OA\Property(property="userType", type="string", enum={"student", "teacher", "admin"}, example="student"),
     *             @OA\Property(property="id", type="string", example="dsf-sadaasdgrsdl"),
     *             @OA\Property(property="role", type="string", enum={"user", "admin"}, example="admin"),
     *             @OA\Property(property="avatar", type="number", example="1"),
     *          )
     *      ),
     * )
     */
    Flight::route('POST /register', function () {
        $requestData = Flight::request()->data->getData();
        $result = Flight::get('authService')->registerUser($requestData);
        
        if ($result == true) {
          Flight::json(array(
              'success' => true,
              'message' => 'Account successfully created!',
              'data' => $result
          ), 200);
        } else {
          Flight::json(array(
              'success' => false,
              'message' => 'Authentication failed.'
          ), 401);
        }
    });
     /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"auth"},
     *      summary="Login into the system",
     *      @OA\Response(
     *           response=200,
     *           description="Successful authentication and token given."
     *      ),
     *      @OA\Response(
     *           response=401,
     *           description="Failed authentication"
     *      ),
     *      @OA\RequestBody(
     *          description="User credentials",
     *          @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="faris.dsfg@ibu.edu.ba"),
     *             @OA\Property(property="password", type="string", format="password", example="123456789"),
     *             @OA\Property(property="rememberMe", type="boolean", format="rememberMe", example=true),
     *          )
     *      ),
     * )
     */
    Flight::route('POST /login', function () {
        $requestData = Flight::request()->data->getData();
        $result = Flight::get('authService')->loginUser($requestData);
        
        if ($result == true) {
            Flight::json(array(
              'success' => true,
              'message' => 'Logged in successfully!',
              'data' => $result
          ), 200);
        } else {
            Flight::json(array(
              'success' => false,
              'message' => 'Authentication failed.'
          ), 401);
        }
    });
    /**
     * @OA\Post(
     *      path="/auth/logout",
     *      tags={"auth"},
     *      summary="Logout user from system",
     *      security={
     *          {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Success response or exception"
     *      ),
     * )
     */
    Flight::route('POST /logout', function () {
      $headers = getallheaders();
      if(isset($headers["Authorization"])) {
          $result = Flight::get('authService')->logoutUser($headers["Authorization"]);
          if ($result) {
            Flight::json(array(
              'success' => true,
              'message' => 'Logged out successfully!',
            ), 200);
          } else {
            Flight::json(array(
              'success' => false,
              'message' => 'Logging out failed!',
            ), 400);
          }
      } else {
          Flight::halt(401, "Unauthorized access");
      }        
    })->addMiddleware(new authMiddleware());
});