<?php 

require_once __DIR__ . '/../services/UserService.class.php';

Flight::set('userService', new UserService());

Flight::group('/users', function () {
    Flight::route('GET /', function () {
        $result = Flight::get('userService')->getAllUsers();
        Flight::json($result);
    });

    Flight::route('GET /achievements', function () {
        $ID = Flight::request()->query['id'];
        if($ID) {
            $result = Flight::get('userService')->getAchievements($ID);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No user id provided'));
        }
    });

    Flight::route('GET /leaderboard', function () {
        $result =  Flight::get('userService')->getLeaderboard();
        Flight::json($result);
    });

    Flight::route('PUT /updateRole', function () {
        $ID = Flight::request()->query['userID'];
        $role = Flight::request()->query['role'];
        if ($ID && $role) {
            $result =  Flight::get('userService')->changeUserRole($ID,$role);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No id provided'));
        }
    });

    Flight::route('PUT /updateAvatar', function () {
        $ID = Flight::request()->query['userID'];
        $clickedAvatar = Flight::request()->query['clickedAvatar'];
        if ($ID && $clickedAvatar) {
            $result =  Flight::get('userService')->changeUserAvatar($clickedAvatar,$ID);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No avatar provided'));
        }
    });

    Flight::route('PUT /updateInformation', function () {
        $requestData = Flight::request()->data->getData();
        if($requestData) {
            $result = Flight::get('userService')->changeUserInfo($requestData);
            Flight::json($result);
          } else {
            Flight::json(array('error' => 'No info provided'));
          }          
    });
    
    Flight::route('DELETE /remove', function () {
        $ID = Flight::request()->query['userID'];
        if($ID) {
            $result = Flight::get('userService')->removeUser($ID);
            Flight::json($result);
        } else {
            Flight::json(array('error' => 'No quiz ID provided'));
        }        
    });
});