<?php 

require_once __DIR__ . '/../dao/HistoryDao.class.php';

class QuizService {
  private $historyDao;

  public function __construct() {
    $this->historyDao = new HistoryDao();
  }
  public function getQuizHistory($id) {
    return $this->getQuizHistory($id);
  }
  public function getQuizHistoryByID($email, $quiz_id) {
    return $this->getQuizHistoryByID($email, $quiz_id); 
  }
}