<?php

require 'vendor/autoload.php';
require 'routes/authRoutes.php';
require 'routes/historyRoutes.php';
require 'routes/userRoutes.php';
require 'routes/quizRoutes.php';

$allowedOrigin = "https://onlinequizplatform.netlify.app";

Flight::route('OPTIONS /*', function() use ($allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
});

Flight::before('start', function() use ($allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});

Flight::start();
