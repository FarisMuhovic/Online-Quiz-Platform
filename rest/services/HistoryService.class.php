<?php 

require_once __DIR__ . '/../dao/HistoryDao.class.php';

class HistoryService {
  private $historyDao;

  public function __construct() {
    $this->historyDao = new HistoryDao();
  }
  
  public function getQuizHistory($id) {
    return $this->historyDao->getQuizHistory($id);
  }

  public function getQuizHistoryByID($email, $quiz_id) {
    return $this->historyDao->getQuizHistoryByID($email, $quiz_id); 
  }
  
  public function insertHistory($payload) {
    return $this->historyDao->insertHistory($payload);
  }
}