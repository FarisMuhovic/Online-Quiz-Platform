<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database access credentials
define('DB_NAME', 'quizapp');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'faris123');
define('DB_HOST', '127.0.0.1'); // localhost

// JWT
define('JWT_SECRET', "h6O5Jew92Oo8TWGf8CTJojHKac2CovLV");