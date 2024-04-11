<?php 

require_once __DIR__ . "/config.php";
require_once 'services/UserService.class.php';

$user_service = new UserService();
header('Content-Type: application/json');
echo json_encode($user_service->get_user_by_id(2));
