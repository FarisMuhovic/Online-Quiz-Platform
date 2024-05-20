DROP DATABASE IF EXISTS quizapp;
CREATE DATABASE quizapp;
USE quizapp;

CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(100) PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
	category VARCHAR(16),   
	avatar INT DEFAULT 1,  
    joinDate DATE DEFAULT (CURDATE()),
    dateOfBirth DATE,
    age INT,
	country VARCHAR(100)
);
   
CREATE TABLE IF NOT EXISTS achievement (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	title VARCHAR(100) NOT NULL,
    banner VARCHAR(50),
	description VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_achievement (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    dateReceived DATE DEFAULT (CURDATE()),
    achievement_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievement(id)
);

CREATE TABLE IF NOT EXISTS quiz (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL,
    bannerImage VARCHAR(50) NOT NULL,
    altText VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    numberOfQuestions INT NOT NULL,
    dateCreated DATE DEFAULT (CURDATE())
);

CREATE TABLE IF NOT EXISTS question (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    quiz_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    type ENUM('MCQ', 'MRQ'), -- MCQ stands for multiple choice questions, MRQ - stands for multiple responses question.
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS question_field (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(150) NOT NULL,
    isCorrect Boolean NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_history (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    quiz_id INT NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    dateTaken DATE DEFAULT (CURDATE()),
    timeTaken INT,
    correctAnswers INT DEFAULT 0,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_answer (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    quiz_history_id INT NOT NULL,
    FOREIGN KEY (quiz_history_id) REFERENCES quiz_history(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS answer (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    quiz_answer_id INT NOT NULL,
    title VARCHAR(100),
    isCorrect BOOLEAN,
    FOREIGN KEY (quiz_answer_id) REFERENCES quiz_answer(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_stats (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id VARCHAR(100) NOT NULL, 
    points INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    totalAttempts INT DEFAULT 0,
    passedAttempts INT DEFAULT 0,
    failedAttempts INT DEFAULT 0,
    scienceAttempts INT DEFAULT 0,
    mathematicsAttempts INT DEFAULT 0,
    historyAttempts INT DEFAULT 0,
    literatureAttempts INT DEFAULT 0,
    geographyAttempts INT DEFAULT 0,
    languagesAttempts INT DEFAULT 0,
    sportsAttempts INT DEFAULT 0,
    musicAttempts INT DEFAULT 0,
    moviesAttempts INT DEFAULT 0,
    FOREIGN KEY (id) REFERENCES user_stats(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_monthly_points (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_stats_id INT NOT NULL, 
    month_year DATE, 
    points INT DEFAULT 0,
    FOREIGN KEY (user_stats_id) REFERENCES user_stats(id) ON DELETE CASCADE
);