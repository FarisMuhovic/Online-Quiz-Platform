<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database access credentials
define('DB_NAME', 'quizapp');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'b.5MedzeEM8jX');
define('DB_HOST', '206.189.56.29'); // my docker container