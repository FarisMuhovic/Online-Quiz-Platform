<?php 

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
    private $user_dao;

    public function __construct(){
        $this->user_dao = new UserDao();
    }

    public function get_user_by_id($user_id) {
        return $this->user_dao->get_user_by_id($user_id);
    }
}
