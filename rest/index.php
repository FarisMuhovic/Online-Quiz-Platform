<?php

require 'vendor/autoload.php';
require 'routes/authRoutes.php';
require 'routes/historyRoutes.php';
require 'routes/userRoutes.php';
require 'routes/quizRoutes.php';

Flight::route('OPTIONS /*', function(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
});

Flight::start();