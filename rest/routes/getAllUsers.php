<?php
header('Content-Type: application/json');
require '../services/UserService.class.php';
$userService = new UserService();

$result = $userService->getAllUsers();
echo json_encode($result);