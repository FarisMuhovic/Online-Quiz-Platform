<?php 

require '../services/UserService.class.php';



if(isset($_POST['userID']) && isset($_POST["role"])) {
    $userID = $_POST['userID'];
    $role = $_POST["role"];
    $userService = new UserService();

    $result = $userService->changeUserRole($userID, $role);
    echo json_encode($result);
} else {
    echo json_encode(array('error' => 'No info provided'));
}