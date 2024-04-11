<?php 

require_once __DIR__ . '/../config.php';
require_once 'BaseDao.class.php'; 

class QuizDao extends BaseDao {
  public function __construct() {
    parent::__construct("quiz");
  }
  
}