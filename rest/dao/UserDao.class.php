<?php 

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php'; 

class UserDao extends BaseDao {
  public function __construct() {
    parent::__construct("user");
  }

  public function get_user_by_id($user_id) {
    return $this->query_unique(
        "SELECT * FROM user WHERE user_id = :user_id",
        ['user_id' => $user_id]
    );
  }
}
