<?php

require '../services/UserService.class.php';
$userService = new UserService();

$result =  $userService->getLeaderboard();
echo json_encode($result);