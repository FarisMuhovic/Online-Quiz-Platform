
<?php 

require_once __DIR__ . '/../services/AuthService.class.php';

Flight::set('authService', new AuthService());

Flight::group('/auth', function () {
  
    Flight::route('POST /register', function () {
        $requestData = Flight::request()->data->getData();
        $result = Flight::get('authService')->registerUser($requestData);
        
        if ($result == true) {
          Flight::json(array(
              'success' => true,
              'message' => 'Account successfully created!'
          ));
        } else {
          Flight::json(array(
              'success' => false,
              'message' => 'Authentication failed.'
          ));
        }
        
    });
    
    Flight::route('POST /login', function () {
        $requestData = Flight::request()->data->getData();
        $result = Flight::get('authService')->loginUser($requestData);
        
        if ($result == true) {
            Flight::json(array(
              'success' => true,
              'message' => 'Logged in successfully!',
              'data' => $result
          ));
        } else {
            Flight::json(array(
              'success' => false,
              'message' => 'Authentication failed.'
          ));
        }
    });
});