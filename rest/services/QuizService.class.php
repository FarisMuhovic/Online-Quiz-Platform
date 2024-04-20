<?php 

require_once __DIR__ . '/../dao/QuizDao.class.php';

class QuizService {
  private $quizDao;

  public function __construct() {
    $this->quizDao = new QuizDao();
  }
  public function getAllQuizBanners() {
    return $this->quizDao->getAllQuizBanners();
  }
  public function getQuizByID($ID) {
    return $this->quizDao->getQuizByID($ID);
  }
}