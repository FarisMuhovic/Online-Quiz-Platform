<?php 

require '../services/UserService.class.php';


if($_GET["userID"]) {
    $userService = new UserService();

    $result = $userService->removeUser($_GET["userID"]);
    echo json_encode($result);
} else {
    echo json_encode(array('error' => 'No quiz ID provided'));
}

