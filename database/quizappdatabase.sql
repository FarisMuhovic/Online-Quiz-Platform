DROP DATABASE quizapp;
CREATE DATABASE quizapp;
USE quizapp;

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50),
    role VARCHAR(20),
	category VARCHAR(20),   
	avatar VARCHAR(20),  
    joinDate DATE,
    dateOfBirth DATE,
	country VARCHAR(50)
);

INSERT INTO user (email, password, firstName, lastName, role, category, avatar, joinDate, dateOfBirth, country)
VALUES 
    ('john.doe@example.com', 'sadas4asd', 'John', 'Doe', 'user', 'educator', 'avatar1', '2023-03-11', '1990-05-15', 'USA'),
    ('alice.smith@example.com', '#$sfasf', 'Alice', 'Smith', 'user', 'quiz enthusiast', 'avatar2', '2023-07-02', '1995-07-20', 'Canada'),
    ('bob.johnson@example.com', 'hipposlol', 'Bob', 'Johnson', 'user', 'student', 'avatar3', '2023-03-07', '1988-11-10', 'UK'),
    ('emily.brown@example.com', 'osdasdsd', 'Emily', 'Brown', 'admin', 'student', 'avatar4', '2023-06-04', '1992-03-25', 'Australia'),
    ('faris.muhovic@stu.ibu.edu.ba', 'farisfare', 'Faris', 'Muhovic', 'admin', 'student', 'avatar5', '2023-04-05', '2002-09-30', 'Germany');
    

CREATE TABLE IF NOT EXISTS achievement (
	achievement_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description VARCHAR(500)
);

INSERT INTO achievement (title, description)
VALUES 
    ('Quiz Master', 'Congratulations! You''ve completed 50 quizzes.'),
    ('Knowledge Explorer', 'Well done! You''ve explored quizzes in 5 different categories.'),
    ('Speed Demon', 'Impressive! You''ve completed a quiz in under 1 minute.'),
    ('Dedicated Learner', 'Keep it up! You''ve spent over 10 hours learning with quizzes.'),
    ('Quiz Champion', 'You''re a true quiz champion! Completed quizzes with a score of 100%.'),
    ('Category Explorer', 'Explore quizzes in 10 different categories and expand your knowledge horizons.');
    

CREATE TABLE IF NOT EXISTS user_achievements (
    user_achievement_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    achievement_id INT,
	FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (achievement_id) REFERENCES achievement(achievement_id)
);

INSERT INTO user_achievements (user_id, achievement_id)
VALUES 
    (1, 1),
    (2, 1),
    (3, 1), 
	(4, 2), 
    (2, 3),
    (3, 4); 
    
CREATE TABLE IF NOT EXISTS quiz (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    bannerImage VARCHAR(100) NOT NULL,
    altText VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    numberOfQuestions INT NOT NULL,
    dateCreated DATE
);

INSERT INTO quiz (title, description, category, bannerImage, altText, duration, numberOfQuestions, dateCreated)
VALUES 
    ('The Element-ary Challenge', 'Test your knowledge of fundamental concepts in chemistry with this introductory quiz. Covering topics such as atomic structure, chemical reactions, and the periodic table, this quiz is suitable for beginners and enthusiasts alike.', 'Science', 'science', 'Science banner', 30, 20, '2023-06-24'),
    ('Number Crunchin'' Challenge', 'Dive into the world of numbers and patterns. This quiz covers everything from basic arithmetic to more challenging algebra and geometry problems. Perfect for sharpening your mathematical skills.', 'Math', 'math', 'Math banner', 45, 25, '2023-06-24'),
    ('Time Travel Trivia', 'Explore significant events, notable figures, and cultural revolutions from around the globe. Test your knowledge of world history and discover the stories that shaped our past.', 'History', 'history', 'History banner', 30, 15, '2023-06-24'),
    ('Who Wrote That?', 'From classic novels to contemporary poetry, test your knowledge of literary masterpieces and the authors who penned them. A quiz for true book lovers and literature enthusiasts.', 'Literature', 'literature', 'Literature banner', 35, 20, '2023-06-24'),
    ('Globe-Trotting Trivia', 'Journey through diverse landscapes, from the highest mountains to the deepest oceans. Test your knowledge of world geography, countries, capitals, and natural wonders.', 'Geography', 'geography', 'Geography banner', 25, 10, '2023-06-24'),
    ('Melody Master', 'From classical symphonies to modern pop hits, test your knowledge across various music genres and eras. Discover the composers, performers, and songs that have left their mark on the world of music.', 'Music', 'music', 'Music banner', 35, 15, '2023-06-24'),
    ('Civilizations and Conflicts', 'Explore major historical events from around the globe with this comprehensive quiz. Test your knowledge on everything from ancient civilizations to modern conflicts.', 'History', 'history', 'History banner', 40, 30, '2023-06-24'),
    ('Speak Like a Citizen of the World', 'How well do you know your music? This quiz challenges you to identify different musical genres and answer trivia questions related to famous musicians and bands.', 'Music', 'music', 'Music banner', 25, 20, '2023-06-24'),
    ('Silver Screen Classics', 'Calling all cinephiles! Put your movie knowledge to the test with this quiz on classic films. From golden age Hollywood to cult favorites, this quiz covers a wide range of genres and eras.', 'Movies', 'movies', 'Movie banner', 30, 25, '2023-06-24'),
    ('World Languages', 'Are you a language enthusiast? Test your knowledge of different languages from around the world in this quiz. You might encounter interesting facts, trivia, and pronunciation challenges.', 'Languages', 'languages', 'Language banner', 20, 15, '2023-06-24'),
    ('The Sporting World', 'Do you consider yourself a sports fanatic? This quiz tests your knowledge on various sports, athletes, and iconic moments. Get ready to answer trivia on everything from football to gymnastics!', 'Sports', 'sport', 'Sports banner', 35, 25, '2023-06-24'),
    ('Literary Masters', 'Delve into the world of renowned authors and iconic characters with this literature quiz. Test your knowledge of classic novels, famous quotes, and literary history.', 'Literature', 'literature', 'Literature banner', 45, 35, '2023-06-24'),
    ('Geographical Whiz', 'Brush up on your geographical knowledge with this quiz! Test your skills on countries, capitals, landmarks, and interesting facts about our planet.', 'Geography', 'geography', 'Geography banner', 20, 18, '2023-06-24'),
    ('Math Mania', 'Are you a math whiz? Challenge yourself with this quiz that covers various mathematical concepts, formulas, and problem-solving techniques.', 'Math', 'math', 'Math banner', 30, 22, '2023-06-24');


CREATE TABLE IF NOT EXISTS question (
    question_id INT AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(150) NOT NULL,
    type VARCHAR(20),
    quiz_id INT, -- Foreign key referencing quiz table
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
);

-- The Element-ary Challenge (Quiz ID: 1)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('What is H2O?', 'checkbox', 1),
    ('What is the chemical symbol for gold?', 'checkbox', 1),
    ('What is the chemical formula for table salt?', 'checkbox', 1),
    ('Which element is a noble gas?', 'checkbox', 1),
    ('What is the chemical formula for methane?', 'checkbox', 1),
    ('Which gas is essential for respiration?', 'checkbox', 1),
    ('What is the chemical symbol for sodium?', 'checkbox', 1),
    ('Which elements are gases at room temperature?', 'multipleChoice', 1),
    ('What is the chemical formula for water?', 'checkbox', 1),
    ('Which of the following are halogens?', 'multipleChoice', 1);

-- Number Crunchin' Challenge (Quiz ID: 2)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('What is the sum of 5 + 7?', 'checkbox', 2),
    ('What is the product of 3 * 4?', 'checkbox', 2),
    ('What is the square root of 16?', 'checkbox', 2),
    ('What is 20% of 50?', 'checkbox', 2),
    ('What is the next number in the sequence: 2, 4, 6, 8, ...?', 'checkbox', 2),
    ('What is the value of π (pi)?', 'checkbox', 2),
    ('What is the area of a rectangle with length 5 and width 10?', 'checkbox', 2),
    ('What is the volume of a cube with side length 3?', 'checkbox', 2),
    ('What is the difference between 10 and 5?', 'checkbox', 2),
    ('What is the perimeter of a square with side length 7?', 'checkbox', 2);

-- Time Travel Trivia (Quiz ID: 3)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('When did World War II end?', 'checkbox', 3),
    ('Who was the first president of the United States?', 'checkbox', 3),
    ('In what year did Christopher Columbus discover America?', 'checkbox', 3),
    ('What year did the Berlin Wall fall?', 'checkbox', 3),
    ('Who wrote the Declaration of Independence?', 'checkbox', 3),
    ('When did the Industrial Revolution begin?', 'checkbox', 3),
    ('What event marked the beginning of World War I?', 'checkbox', 3),
    ('When was the Magna Carta signed?', 'checkbox', 3),
    ('Who was the first emperor of Rome?', 'checkbox', 3),
    ('When was the French Revolution?', 'checkbox', 3);

-- Who Wrote That? (Quiz ID: 4)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Who wrote "Romeo and Juliet"?', 'checkbox', 4),
    ('Who wrote "To Kill a Mockingbird"?', 'checkbox', 4),
    ('Who wrote "Pride and Prejudice"?', 'checkbox', 4),
    ('Who wrote "1984"?', 'checkbox', 4),
    ('Who wrote "The Great Gatsby"?', 'checkbox', 4),
    ('Who wrote "Moby Dick"?', 'checkbox', 4),
    ('Who wrote "The Catcher in the Rye"?', 'checkbox', 4),
    ('Who wrote "Harry Potter and the Philosopher''s Stone"?', 'checkbox', 4),
    ('Who wrote "The Lord of the Rings"?', 'checkbox', 4),
    ('Who wrote "Hamlet"?', 'checkbox', 4);

-- Globe-Trotting Trivia (Quiz ID: 5)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('What is the capital of France?', 'checkbox', 5),
    ('What is the longest river in the world?', 'checkbox', 5),
    ('Which country is known as the Land of the Rising Sun?', 'checkbox', 5),
    ('What is the largest desert in the world?', 'checkbox', 5),
    ('Which continent is known as the Land Down Under?', 'checkbox', 5),
    ('In which country is the Great Barrier Reef located?', 'checkbox', 5),
    ('What is the tallest mountain in the world?', 'checkbox', 5),
    ('Which city is known as the City of Love?', 'checkbox', 5),
    ('Where is the Taj Mahal located?', 'checkbox', 5),
    ('What is the largest ocean in the world?', 'checkbox', 5);

-- Melody Master (Quiz ID: 6)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Who is known as the King of Pop?', 'checkbox', 6),
    ('Which band released the album "The Dark Side of the Moon"?', 'checkbox', 6),
    ('Who composed the symphony "Symphony No. 9"?', 'checkbox', 6),
    ('Who is the lead singer of the band Queen?', 'checkbox', 6),
    ('Which artist released the hit song "Bohemian Rhapsody"?', 'checkbox', 6),
    ('Who composed the opera "The Marriage of Figaro"?', 'checkbox', 6),
    ('Which band released the album "Abbey Road"?', 'checkbox', 6),
    ('Who is known as the Queen of Soul?', 'checkbox', 6),
    ('Which artist released the album "Thriller"?', 'checkbox', 6),
    ('Who composed the ballet "Swan Lake"?', 'checkbox', 6);

-- Civilizations and Conflicts (Quiz ID: 7)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('In which century did the Renaissance begin?', 'checkbox', 7),
    ('Which empire was ruled by Julius Caesar?', 'checkbox', 7),
    ('What year did the American Civil War end?', 'checkbox', 7),
    ('Who was the first emperor of China?', 'checkbox', 7),
    ('Who was the first female pharaoh of Egypt?', 'checkbox', 7),
    ('In what year did the French Revolution begin?', 'checkbox', 7),
    ('Who was the founder of the Mongol Empire?', 'checkbox', 7),
    ('Who was the first president of the United States?', 'checkbox', 7),
    ('Which empire was ruled by Alexander the Great?', 'checkbox', 7),
    ('Who was the first emperor of Rome?', 'checkbox', 7);

-- Speak Like a Citizen of the World (Quiz ID: 8)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Which country is known for its flamenco dancing?', 'checkbox', 8),
    ('What is the official language of Brazil?', 'checkbox', 8),
    ('Which language is spoken in the most countries worldwide?', 'checkbox', 8),
    ('What is the national language of Japan?', 'checkbox', 8),
    ('Which language is widely spoken in India?', 'checkbox', 8),
    ('What is the official language of Germany?', 'checkbox', 8),
    ('Which language uses the Cyrillic alphabet?', 'checkbox', 8),
    ('What is the official language of Iran?', 'checkbox', 8),
    ('Which language is spoken in the Netherlands?', 'checkbox', 8),
    ('What is the official language of South Africa?', 'checkbox', 8);

-- Silver Screen Classics (Quiz ID: 9)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Who directed the movie "Citizen Kane"?', 'checkbox', 9),
    ('Which film won the Academy Award for Best Picture in 1994?', 'checkbox', 9),
    ('Who played the character of Vito Corleone in "The Godfather"?', 'checkbox', 9),
    ('Which film won the first Academy Award for Best Picture?', 'checkbox', 9),
    ('Who directed the movie "Psycho"?', 'checkbox', 9),
    ('Which film features the character Hannibal Lecter?', 'checkbox', 9),
    ('Who played the character of Indiana Jones?', 'checkbox', 9),
    ('Which film won the Academy Award for Best Animated Feature in 2001?', 'checkbox', 9),
    ('Who directed the movie "Schindler''s List"?', 'checkbox', 9),
    ('Which film features the character James Bond?', 'checkbox', 9);

-- World Languages (Quiz ID: 10)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('What is the most spoken language in the world?', 'checkbox', 10),
    ('Which language is spoken in Switzerland?', 'checkbox', 10),
    ('What is the official language of Argentina?', 'checkbox', 10),
    ('Which language uses the Greek alphabet?', 'checkbox', 10),
    ('What is the national language of Kenya?', 'checkbox', 10),
    ('Which language is spoken in Sweden?', 'checkbox', 10),
    ('What is the official language of Egypt?', 'checkbox', 10),
    ('Which language is widely spoken in Canada?', 'checkbox', 10),
    ('What is the national language of Thailand?', 'checkbox', 10),
    ('Which language is spoken in Israel?', 'checkbox', 10);

-- The Sporting World (Quiz ID: 11)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Which sport is played at Wimbledon?', 'checkbox', 11),
    ('Who won the first modern Olympic Games in 1896?', 'checkbox', 11),
    ('In which country did cricket originate?', 'checkbox', 11),
    ('Who is the all-time top scorer in men''s international soccer?', 'checkbox', 11),
    ('Which country has won the most FIFA World Cup titles?', 'checkbox', 11),
    ('Who is the only boxer to win world titles in eight different weight classes?', 'checkbox', 11),
    ('In which sport can you perform a "slam dunk"?', 'checkbox', 11),
    ('Which country has won the most Olympic gold medals?', 'checkbox', 11),
    ('Who won the most gold medals at the 2016 Summer Olympics?', 'checkbox', 11),
    ('Which sport is associated with the term "birdie"?', 'checkbox', 11);

-- Literary Masters (Quiz ID: 12)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Who wrote "The Canterbury Tales"?', 'checkbox', 12),
    ('Who wrote the novel "1984"?', 'checkbox', 12),
    ('Which author created the character Sherlock Holmes?', 'checkbox', 12),
    ('Who wrote the play "Romeo and Juliet"?', 'checkbox', 12),
    ('Which author wrote "The Adventures of Tom Sawyer"?', 'checkbox', 12),
    ('Who wrote the novel "War and Peace"?', 'checkbox', 12),
    ('Which author wrote "Moby-Dick"?', 'checkbox', 12),
    ('Who wrote the novel "Frankenstein"?', 'checkbox', 12),
    ('Which author wrote "The Picture of Dorian Gray"?', 'checkbox', 12),
    ('Who wrote the poem "The Raven"?', 'checkbox', 12);

-- Geographical Whiz (Quiz ID: 13)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('Which continent is the largest by land area?', 'checkbox', 13),
    ('What is the smallest country in the world?', 'checkbox', 13),
    ('Which river is the longest in Asia?', 'checkbox', 13),
    ('What is the highest mountain in Africa?', 'checkbox', 13),
    ('Which desert is the largest in Africa?', 'checkbox', 13),
    ('What is the capital of Australia?', 'checkbox', 13),
    ('Which country is known as the Land of the Rising Sun?', 'checkbox', 13),
    ('What is the largest island in the world?', 'checkbox', 13),
    ('Which country is located at the southern tip of the African continent?', 'checkbox', 13),
    ('What is the largest lake in Africa?', 'checkbox', 13);
    
-- Math Mania (Quiz ID: 14)
INSERT INTO question (title, type, quiz_id)
VALUES 
    ('What is the value of pi (π) to two decimal places?', 'checkbox', 14),
    ('What is the square root of 144?', 'checkbox', 14),
    ('What is the area of a rectangle with length 5 units and width 10 units?', 'checkbox', 14),
    ('What is the sum of the interior angles of a triangle?', 'checkbox', 14),
    ('What is the product of 7 and 8?', 'checkbox', 14),
    ('What is the circumference of a circle with diameter 10 units?', 'checkbox', 14),
    ('What is the next number in the sequence: 1, 4, 9, 16, ...?', 'checkbox', 14),
    ('What is the value of 5 squared?', 'checkbox', 14),
    ('What is the result of 12 divided by 3?', 'checkbox', 14),
    ('What is the perimeter of a square with side length 6 units?', 'checkbox', 14);

CREATE TABLE IF NOT EXISTS question_field (
    field_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    isCorrect VARCHAR(30) NOT NULL,
    question_id INT, -- Foreign key referencing question table
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);

-- For The Element-ary Challenge (Quiz ID: 1)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Water', TRUE, 1),
    ('Oxygen', FALSE, 1),
    ('Sodium Hydroxide', FALSE, 1),
    ('Carbon Dioxide', FALSE, 1),
    ('Gold', TRUE, 2),
    ('Silver', FALSE, 2),
    ('Iron', FALSE, 2),
    ('Copper', FALSE, 2),
    ('NaCl', TRUE, 3),
    ('NaOH', FALSE, 3),
    ('H2SO4', FALSE, 3),
    ('HCl', FALSE, 3),
    ('Helium', TRUE, 4),
    ('Neon', FALSE, 4),
    ('Oxygen', FALSE, 4),
    ('Hydrogen', FALSE, 4),
    ('CH4', TRUE, 5),
    ('CO2', FALSE, 5),
    ('H2SO4', FALSE, 5),
    ('NH3', FALSE, 5),
    ('Oxygen', TRUE, 6),
    ('Carbon Dioxide', FALSE, 6),
    ('Nitrogen', FALSE, 6),
    ('Methane', FALSE, 6),
    ('Na', TRUE, 7),
    ('K', FALSE, 7),
    ('Fe', FALSE, 7),
    ('Mg', FALSE, 7),
    ('Oxygen', TRUE, 8),
    ('Hydrogen', FALSE, 8),
    ('Carbon', FALSE, 8),
    ('Nitrogen', FALSE, 8),
    ('H2O', TRUE, 9),
    ('CO2', FALSE, 9),
    ('HCl', FALSE, 9),
    ('NH3', FALSE, 9),
    ('Fluorine', TRUE, 10),
    ('Hydrogen', FALSE, 10),
    ('Helium', FALSE, 10),
    ('Sodium', FALSE, 10);

-- For Number Crunchin' Challenge (Quiz ID: 2)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('12', TRUE, 11),
    ('10', FALSE, 11),
    ('15', FALSE, 11),
    ('8', FALSE, 11),
    ('12', TRUE, 12),
    ('10', FALSE, 12),
    ('15', FALSE, 12),
    ('8', FALSE, 12),
    ('4', TRUE, 13),
    ('5', FALSE, 13),
    ('6', FALSE, 13),
    ('7', FALSE, 13),
    ('10', TRUE, 14),
    ('8', FALSE, 14),
    ('12', FALSE, 14),
    ('15', FALSE, 14),
    ('10', TRUE, 15),
    ('8', FALSE, 15),
    ('12', FALSE, 15),
    ('15', FALSE, 15),
    ('3.14', TRUE, 16),
    ('3.15', FALSE, 16),
    ('3.12', FALSE, 16),
    ('3.10', FALSE, 16),
    ('50', TRUE, 17),
    ('40', FALSE, 17),
    ('60', FALSE, 17),
    ('70', FALSE, 17),
    ('27', TRUE, 18),
    ('30', FALSE, 18),
    ('25', FALSE, 18),
    ('20', FALSE, 18),
    ('5', TRUE, 19),
    ('6', FALSE, 19),
    ('4', FALSE, 19),
    ('3', FALSE, 19),
    ('28', TRUE, 20),
    ('30', FALSE, 20),
    ('25', FALSE, 20),
    ('20', FALSE, 20);

-- For Time Travel Trivia (Quiz ID: 3)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('1945', TRUE, 21),
    ('1939', FALSE, 21),
    ('1950', FALSE, 21),
    ('1960', FALSE, 21),
    ('George Washington', TRUE, 22),
    ('Thomas Jefferson', FALSE, 22),
    ('Abraham Lincoln', FALSE, 22),
    ('James Madison', FALSE, 22),
    ('1492', TRUE, 23),
    ('1490', FALSE, 23),
    ('1500', FALSE, 23),
    ('1480', FALSE, 23),
    ('1989', TRUE, 24),
    ('1985', FALSE, 24),
    ('1990', FALSE, 24),
    ('1995', FALSE, 24),
    ('Thomas Jefferson', TRUE, 25),
    ('Benjamin Franklin', FALSE, 25),
    ('John Adams', FALSE, 25),
    ('James Madison', FALSE, 25),
    ('Late 18th century', TRUE, 26),
    ('Early 19th century', FALSE, 26),
    ('Mid 17th century', FALSE, 26),
    ('Early 20th century', FALSE, 26),
    ('Assassination of Archduke Franz Ferdinand', TRUE, 27),
    ('Bombing of Pearl Harbor', FALSE, 27),
    ('Signing of the Magna Carta', FALSE, 27),
    ('Discovery of America', FALSE, 27),
    ('1215', TRUE, 28),
    ('1220', FALSE, 28),
    ('1200', FALSE, 28),
    ('1230', FALSE, 28),
    ('Augustus', TRUE, 29),
    ('Nero', FALSE, 29),
    ('Julius Caesar', FALSE, 29),
    ('Tiberius', FALSE, 29),
    ('1789', TRUE, 30),
    ('1799', FALSE, 30),
    ('1776', FALSE, 30),
    ('1800', FALSE, 30);

-- For Who Wrote That? (Quiz ID: 4)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('William Shakespeare', TRUE, 31),
    ('Charles Dickens', FALSE, 31),
    ('Jane Austen', FALSE, 31),
    ('George Orwell', FALSE, 31),
    ('Harper Lee', TRUE, 32),
    ('Mark Twain', FALSE, 32),
    ('F. Scott Fitzgerald', FALSE, 32),
    ('J.D. Salinger', FALSE, 32),
    ('Jane Austen', TRUE, 33),
    ('Emily Bronte', FALSE, 33),
    ('Charles Dickens', FALSE, 33),
    ('George Orwell', FALSE, 33),
    ('George Orwell', TRUE, 34),
    ('J.K. Rowling', FALSE, 34),
    ('Aldous Huxley', FALSE, 34),
    ('Ernest Hemingway', FALSE, 34),
    ('F. Scott Fitzgerald', TRUE, 35),
    ('Ernest Hemingway', FALSE, 35),
    ('Mark Twain', FALSE, 35),
    ('John Steinbeck', FALSE, 35),
    ('Herman Melville', TRUE, 36),
    ('Mark Twain', FALSE, 36),
    ('Leo Tolstoy', FALSE, 36),
    ('Charles Dickens', FALSE, 36),
    ('J.D. Salinger', TRUE, 37),
    ('F. Scott Fitzgerald', FALSE, 37),
    ('Ernest Hemingway', FALSE, 37),
    ('Mark Twain', FALSE, 37),
    ('J.K. Rowling', TRUE, 38),
    ('J.R.R. Tolkien', FALSE, 38),
    ('C.S. Lewis', FALSE, 38),
    ('Stephen King', FALSE, 38),
    ('J.R.R. Tolkien', TRUE, 39),
    ('C.S. Lewis', FALSE, 39),
    ('J.K. Rowling', FALSE, 39),
    ('George R.R. Martin', FALSE, 39),
    ('William Shakespeare', TRUE, 40),
    ('Charles Dickens', FALSE, 40),
    ('Jane Austen', FALSE, 40),
    ('Mark Twain', FALSE, 40);
    
-- For Globe-Trotting Trivia (Quiz ID: 5)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Paris', TRUE, 41),
    ('Berlin', FALSE, 41),
    ('London', FALSE, 41),
    ('Rome', FALSE, 41),
    ('Nile', TRUE, 42),
    ('Amazon', FALSE, 42),
    ('Mississippi', FALSE, 42),
    ('Yangtze', FALSE, 42),
    ('Japan', TRUE, 43),
    ('China', FALSE, 43),
    ('Korea', FALSE, 43),
    ('Vietnam', FALSE, 43),
    ('Sahara', TRUE, 44),
    ('Arabian', FALSE, 44),
    ('Gobi', FALSE, 44),
    ('Kalahari', FALSE, 44),
    ('Australia', TRUE, 45),
    ('North America', FALSE, 45),
    ('South America', FALSE, 45),
    ('Europe', FALSE, 45),
    ('Australia', TRUE, 46),
    ('Brazil', FALSE, 46),
    ('Indonesia', FALSE, 46),
    ('India', FALSE, 46),
    ('Mount Everest', TRUE, 47),
    ('K2', FALSE, 47),
    ('Kangchenjunga', FALSE, 47),
    ('Makalu', FALSE, 47),
    ('Paris', TRUE, 48),
    ('Rome', FALSE, 48),
    ('Venice', FALSE, 48),
    ('Barcelona', FALSE, 48),
    ('India', TRUE, 49),
    ('Indonesia', FALSE, 49),
    ('China', FALSE, 49),
    ('Thailand', FALSE, 49),
    ('Pacific', TRUE, 50),
    ('Atlantic', FALSE, 50),
    ('Indian', FALSE, 50),
    ('Arctic', FALSE, 50);
    
-- For Melody Master (Quiz ID: 6)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Michael Jackson', TRUE, 51),
    ('Prince', FALSE, 51),
    ('Elvis Presley', FALSE, 51),
    ('Madonna', FALSE, 51),
    ('Pink Floyd', TRUE, 52),
    ('Led Zeppelin', FALSE, 52),
    ('The Beatles', FALSE, 52),
    ('The Rolling Stones', FALSE, 52),
    ('Ludwig van Beethoven', TRUE, 53),
    ('Wolfgang Amadeus Mozart', FALSE, 53),
    ('Johann Sebastian Bach', FALSE, 53),
    ('Franz Schubert', FALSE, 53),
    ('Freddie Mercury', TRUE, 54),
    ('Mick Jagger', FALSE, 54),
    ('Elton John', FALSE, 54),
    ('David Bowie', FALSE, 54),
    ('Queen', TRUE, 55),
    ('ABBA', FALSE, 55),
    ('The Beatles', FALSE, 55),
    ('Led Zeppelin', FALSE, 55),
    ('Wolfgang Amadeus Mozart', TRUE, 56),
    ('Ludwig van Beethoven', FALSE, 56),
    ('Johann Sebastian Bach', FALSE, 56),
    ('Franz Joseph Haydn', FALSE, 56),
    ('The Beatles', TRUE, 57),
    ('The Rolling Stones', FALSE, 57),
    ('Led Zeppelin', FALSE, 57),
    ('Pink Floyd', FALSE, 57),
    ('Aretha Franklin', TRUE, 58),
    ('Diana Ross', FALSE, 58),
    ('Whitney Houston', FALSE, 58),
    ('Tina Turner', FALSE, 58),
    ('Michael Jackson', TRUE, 59),
    ('Prince', FALSE, 59),
    ('Elvis Presley', FALSE, 59),
    ('Madonna', FALSE, 59),
    ('Pyotr Ilyich Tchaikovsky', TRUE, 60),
    ('Igor Stravinsky', FALSE, 60),
    ('Johann Sebastian Bach', FALSE, 60),
    ('Ludwig van Beethoven', FALSE, 60);
    
-- For Civilizations and Conflicts (Quiz ID: 7)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('15th century', TRUE, 61),
    ('12th century', FALSE, 61),
    ('18th century', FALSE, 61),
    ('21st century', FALSE, 61),
    ('Roman Empire', TRUE, 62),
    ('Greek Empire', FALSE, 62),
    ('Persian Empire', FALSE, 62),
    ('Ottoman Empire', FALSE, 62),
    ('1865', TRUE, 63),
    ('1789', FALSE, 63),
    ('1945', FALSE, 63),
    ('1914', FALSE, 63),
    ('Qin Shi Huang', TRUE, 64),
    ('Sun Tzu', FALSE, 64),
    ('Confucius', FALSE, 64),
    ('Mao Zedong', FALSE, 64),
    ('Hatshepsut', TRUE, 65),
    ('Nefertiti', FALSE, 65),
    ('Cleopatra', FALSE, 65),
    ('Ramses II', FALSE, 65),
    ('1789', TRUE, 66),
    ('1804', FALSE, 66),
    ('1750', FALSE, 66),
    ('1815', FALSE, 66),
    ('Genghis Khan', TRUE, 67),
    ('Attila the Hun', FALSE, 67),
    ('Kublai Khan', FALSE, 67),
    ('Tamerlane', FALSE, 67),
    ('George Washington', TRUE, 68),
    ('Thomas Jefferson', FALSE, 68),
    ('John Adams', FALSE, 68),
    ('James Madison', FALSE, 68),
    ('Macedonian Empire', TRUE, 69),
    ('Roman Empire', FALSE, 69),
    ('Persian Empire', FALSE, 69),
    ('Greek Empire', FALSE, 69),
    ('Augustus', TRUE, 70),
    ('Nero', FALSE, 70),
    ('Julius Caesar', FALSE, 70),
    ('Tiberius', FALSE, 70);
    
-- For Speak Like a Citizen of the World (Quiz ID: 8)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Spain', TRUE, 71),
    ('Italy', FALSE, 71),
    ('Portugal', FALSE, 71),
    ('Greece', FALSE, 71),
    ('Portuguese', TRUE, 72),
    ('Spanish', FALSE, 72),
    ('French', FALSE, 72),
    ('Italian', FALSE, 72),
    ('English', TRUE, 73),
    ('Chinese', FALSE, 73),
    ('Hindi', FALSE, 73),
    ('Arabic', FALSE, 73),
    ('Japanese', TRUE, 74),
    ('Korean', FALSE, 74),
    ('Chinese', FALSE, 74),
    ('Vietnamese', FALSE, 74),
    ('Hindi', TRUE, 75),
    ('Urdu', FALSE, 75),
    ('Bengali', FALSE, 75),
    ('Tamil', FALSE, 75),
    ('German', TRUE, 76),
    ('French', FALSE, 76),
    ('Italian', FALSE, 76),
    ('Russian', FALSE, 76),
    ('Russian', TRUE, 77),
    ('Greek', FALSE, 77),
    ('Armenian', FALSE, 77),
    ('Hebrew', FALSE, 77),
    ('Persian', TRUE, 78),
    ('Arabic', FALSE, 78),
    ('Turkish', FALSE, 78),
    ('Pashto', FALSE, 78),
    ('Dutch', TRUE, 79),
    ('Swedish', FALSE, 79),
    ('Danish', FALSE, 79),
    ('Norwegian', FALSE, 79),
    ('English', TRUE, 80),
    ('French', FALSE, 80),
    ('Spanish', FALSE, 80),
    ('Italian', FALSE, 80);
    
-- For Silver Screen Classics (Quiz ID: 9)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Orson Welles', TRUE, 81),
    ('Alfred Hitchcock', FALSE, 81),
    ('Stanley Kubrick', FALSE, 81),
    ('Martin Scorsese', FALSE, 81),
    ('Forrest Gump', TRUE, 82),
    ('Saving Private Ryan', FALSE, 82),
    ('Schindler''s List', FALSE, 82),
    ('Braveheart', FALSE, 82),
    ('Marlon Brando', TRUE, 83),
    ('Robert De Niro', FALSE, 83),
    ('Al Pacino', FALSE, 83),
    ('Jack Nicholson', FALSE, 83),
    ('Wings', TRUE, 84),
    ('Top Gun', FALSE, 84),
    ('Platoon', FALSE, 84),
    ('Pearl Harbor', FALSE, 84),
    ('Alfred Hitchcock', TRUE, 85),
    ('Steven Spielberg', FALSE, 85),
    ('Quentin Tarantino', FALSE, 85),
    ('Francis Ford Coppola', FALSE, 85),
    ('The Silence of the Lambs', TRUE, 86),
    ('Seven', FALSE, 86),
    ('Psycho', FALSE, 86),
    ('The Shining', FALSE, 86),
    ('Harrison Ford', TRUE, 87),
    ('Tom Cruise', FALSE, 87),
    ('Arnold Schwarzenegger', FALSE, 87),
    ('Mel Gibson', FALSE, 87),
    ('Shrek', TRUE, 88),
    ('Toy Story', FALSE, 88),
    ('Finding Nemo', FALSE, 88),
    ('Frozen', FALSE, 88),
    ('Steven Spielberg', TRUE, 89),
    ('Christopher Nolan', FALSE, 89),
    ('Quentin Tarantino', FALSE, 89),
    ('Martin Scorsese', FALSE, 89),
    ('James Bond', TRUE, 90),
    ('Jason Bourne', FALSE, 90),
    ('Ethan Hunt', FALSE, 90),
    ('John Wick', FALSE, 90);
    
-- For World Languages (Quiz ID: 10)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('English', TRUE, 91),
    ('Spanish', FALSE, 91),
    ('Mandarin', FALSE, 91),
    ('Arabic', FALSE, 91),
    ('Chinese', TRUE, 92),
    ('French', FALSE, 92),
    ('German', FALSE, 92),
    ('Japanese', FALSE, 92),
    ('Spanish', TRUE, 93),
    ('Portuguese', FALSE, 93),
    ('Italian', FALSE, 93),
    ('French', FALSE, 93),
    ('Japanese', TRUE, 94),
    ('Korean', FALSE, 94),
    ('Thai', FALSE, 94),
    ('Vietnamese', FALSE, 94),
    ('Arabic', TRUE, 95),
    ('Persian', FALSE, 95),
    ('Turkish', FALSE, 95),
    ('Hebrew', FALSE, 95),
    ('French', TRUE, 96),
    ('German', FALSE, 96),
    ('Italian', FALSE, 96),
    ('Spanish', FALSE, 96),
    ('Russian', TRUE, 97),
    ('Polish', FALSE, 97),
    ('Ukrainian', FALSE, 97),
    ('Romanian', FALSE, 97),
    ('Spanish', TRUE, 98),
    ('Portuguese', FALSE, 98),
    ('French', FALSE, 98),
    ('Italian', FALSE, 98),
    ('Mandarin', TRUE, 99),
    ('Cantonese', FALSE, 99),
    ('Japanese', FALSE, 99),
    ('Korean', FALSE, 99),
    ('Hindi', TRUE, 100),
    ('Bengali', FALSE, 100),
    ('Tamil', FALSE, 100),
    ('Telugu', FALSE, 100);

-- For The Sporting World (Quiz ID: 11)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Tennis', TRUE, 101),
    ('Golf', FALSE, 101),
    ('Soccer', FALSE, 101),
    ('Cricket', FALSE, 101),
    ('USA', FALSE, 102),
    ('Greece', TRUE, 102),
    ('France', FALSE, 102),
    ('Germany', FALSE, 102),
    ('England', TRUE, 103),
    ('India', FALSE, 103),
    ('Australia', FALSE, 103),
    ('South Africa', FALSE, 103),
    ('Pele', FALSE, 104),
    ('Lionel Messi', FALSE, 104),
    ('Cristiano Ronaldo', TRUE, 104),
    ('Diego Maradona', FALSE, 104),
    ('Brazil', TRUE, 105),
    ('Germany', FALSE, 105),
    ('Argentina', FALSE, 105),
    ('Italy', FALSE, 105),
    ('Floyd Mayweather Jr.', TRUE, 106),
    ('Muhammad Ali', FALSE, 106),
    ('Mike Tyson', FALSE, 106),
    ('Manny Pacquiao', FALSE, 106),
    ('Basketball', TRUE, 107),
    ('Tennis', FALSE, 107),
    ('Golf', FALSE, 107),
    ('Soccer', FALSE, 107),
    ('USA', TRUE, 108),
    ('China', FALSE, 108),
    ('Russia', FALSE, 108),
    ('Germany', FALSE, 108),
    ('Michael Phelps', TRUE, 109),
    ('Usain Bolt', FALSE, 109),
    ('Simone Biles', FALSE, 109),
    ('Katie Ledecky', FALSE, 109),
    ('Tennis', TRUE, 110),
    ('Golf', FALSE, 110),
    ('Soccer', FALSE, 110),
    ('Badminton', FALSE, 110);

-- For Literary Masters (Quiz ID: 12)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Geoffrey Chaucer', TRUE, 111),
    ('William Shakespeare', FALSE, 111),
    ('John Milton', FALSE, 111),
    ('Homer', FALSE, 111),
    ('George Orwell', TRUE, 112),
    ('Aldous Huxley', FALSE, 112),
    ('J.R.R. Tolkien', FALSE, 112),
    ('George Bernard Shaw', FALSE, 112),
    ('Arthur Conan Doyle', TRUE, 113),
    ('Charles Dickens', FALSE, 113),
    ('Jane Austen', FALSE, 113),
    ('Mark Twain', FALSE, 113),
    ('William Shakespeare', TRUE, 114),
    ('Tennessee Williams', FALSE, 114),
    ('Oscar Wilde', FALSE, 114),
    ('George Bernard Shaw', FALSE, 114),
    ('Mark Twain', TRUE, 115),
    ('J.D. Salinger', FALSE, 115),
    ('Charles Dickens', FALSE, 115),
    ('F. Scott Fitzgerald', FALSE, 115),
    ('Leo Tolstoy', TRUE, 116),
    ('Fyodor Dostoevsky', FALSE, 116),
    ('Anton Chekhov', FALSE, 116),
    ('Nikolai Gogol', FALSE, 116),
    ('Herman Melville', TRUE, 117),
    ('Edgar Allan Poe', FALSE, 117),
    ('Mark Twain', FALSE, 117),
    ('Emily Dickinson', FALSE, 117),
    ('Oscar Wilde', TRUE, 118),
    ('Mary Shelley', FALSE, 118),
    ('Bram Stoker', FALSE, 118),
    ('Edgar Allan Poe', FALSE, 118),
    ('Oscar Wilde', TRUE, 119),
    ('H.G. Wells', FALSE, 119),
    ('F. Scott Fitzgerald', FALSE, 119),
    ('Emily Brontë', FALSE, 119),
    ('Edgar Allan Poe', TRUE, 120),
    ('Robert Frost', FALSE, 120),
    ('Walt Whitman', FALSE, 120),
    ('William Wordsworth', FALSE, 120);

-- For Geographical Whiz (Quiz ID: 13)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('Asia', FALSE, 121),
    ('Africa', FALSE, 121),
    ('North America', FALSE, 121),
    ('Australia', TRUE, 121),
    ('Vatican City', TRUE, 122),
    ('Monaco', FALSE, 122),
    ('Nauru', FALSE, 122),
    ('Tuvalu', FALSE, 122),
    ('Yangtze', TRUE, 123),
    ('Nile', FALSE, 123),
    ('Amazon', FALSE, 123),
    ('Mississippi', FALSE, 123),
    ('Kilimanjaro', FALSE, 124),
    ('Everest', TRUE, 124),
    ('K2', FALSE, 124),
    ('Kangchenjunga', FALSE, 124),
    ('Sahara', TRUE, 125),
    ('Arabian', FALSE, 125),
    ('Gobi', FALSE, 125),
    ('Kalahari', FALSE, 125),
    ('Canberra', TRUE, 126),
    ('Wellington', FALSE, 126),
    ('Canberra', FALSE, 126),
    ('Sydney', FALSE, 126),
    ('Japan', TRUE, 127),
    ('China', FALSE, 127),
    ('South Korea', FALSE, 127),
    ('Thailand', FALSE, 127),
    ('Greenland', TRUE, 128),
    ('Madagascar', FALSE, 128),
    ('Borneo', FALSE, 128),
    ('New Guinea', FALSE, 128),
    ('South Africa', TRUE, 129),
    ('Egypt', FALSE, 129),
    ('Nigeria', FALSE, 129),
    ('Namibia', FALSE, 129),
    ('Victoria', TRUE, 130),
    ('Tanganyika', FALSE, 130),
    ('Malawi', FALSE, 130),
    ('Edward', FALSE, 130);

-- For Math Mania (Quiz ID: 14)
INSERT INTO question_field (title, isCorrect, question_id) VALUES
    ('3.14', TRUE, 131),
    ('3.12', FALSE, 131),
    ('3.16', FALSE, 131),
    ('3.18', FALSE, 131),
    ('12', TRUE, 132),
    ('14', FALSE, 132),
    ('10', FALSE, 132),
    ('16', FALSE, 132),
    ('50 square units', TRUE, 133),
    ('15 square units', FALSE, 133),
    ('50 units', FALSE, 133),
    ('100 square units', FALSE, 133),
    ('180 degrees', TRUE, 134),
    ('90 degrees', FALSE, 134),
    ('270 degrees', FALSE, 134),
    ('360 degrees', FALSE, 134),
    ('56', TRUE, 135),
    ('14', FALSE, 135),
    ('60', FALSE, 135),
    ('32', FALSE, 135),
    ('31.42 units', TRUE, 136),
    ('31.4 units', FALSE, 136),
    ('30 units', FALSE, 136),
    ('31.5 units', FALSE, 136),
    ('25', TRUE, 137),
    ('36', FALSE, 137),
    ('64', FALSE, 137),
    ('49', FALSE, 137),
    ('100 units', TRUE, 138),
    ('24 units', FALSE, 138),
    ('36 units', FALSE, 138),
    ('60 units', FALSE, 138),
    ('Pi', TRUE, 139),
    ('5', FALSE, 139),
    ('6.28', FALSE, 139),
    ('3.5', FALSE, 139),
    ('9', TRUE, 140),
    ('4', FALSE, 140),
    ('6', FALSE, 140),
    ('3', FALSE, 140);

CREATE TABLE IF NOT EXISTS quiz_history (
    quiz_history_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    user_id INT, -- Foreign key referencing the user table
    title VARCHAR(100) NOT NULL,
    dateTaken DATE,
    timeTaken INT,
    category VARCHAR(50),
    amountOfQuestions INT,
    correctAnswers INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

INSERT INTO quiz_history (user_id, quiz_id, title, dateTaken, timeTaken, category, amountOfQuestions, correctAnswers)
VALUES (1, 1, 'The Element-ary Challenge', '2024-03-30', 1, 'science', 10, 4);

INSERT INTO quiz_history (user_id, quiz_id, title, dateTaken, timeTaken, category, amountOfQuestions, correctAnswers)
VALUES (2, 1, 'The Element-ary Challenge', '2024-03-31', 1, 'science', 10, 7);


CREATE TABLE IF NOT EXISTS response (
    response_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_history_id INT, -- Foreign key referencing the quiz_history table
    questionName VARCHAR(100) NOT NULL,
    isCorrect VARCHAR(25) NOT NULL,
    FOREIGN KEY (quiz_history_id) REFERENCES quiz_history(quiz_history_id)
);

CREATE TABLE IF NOT EXISTS answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT, -- Foreign key referencing the response table
    text VARCHAR(100),
    FOREIGN KEY (response_id) REFERENCES response(response_id)
);

CREATE TABLE IF NOT EXISTS answer_field (
    answer_field_id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT, -- Foreign key referencing the response table
    title VARCHAR(50) NOT NULL,
    isCorrect VARCHAR(20) NOT NULL,
    FOREIGN KEY (response_id) REFERENCES response(response_id)
);

-- Response and answers for the first question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is H2O?', 'true');

INSERT INTO answer (response_id, text)
VALUES (1, 'Water');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (1, 'Water', 'true'),
       (1, 'Oxygen', 'false'),
       (1, 'Sodium Hydroxide', 'false'),
       (1, 'Carbon Dioxide', 'false');

-- Response and answers for the second question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is the chemical symbol for gold?', 'true');

INSERT INTO answer (response_id, text)
VALUES (2, 'Au');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (2, 'Au', 'true'),
       (2, 'Ag', 'false'),
       (2, 'Fe', 'false'),
       (2, 'Cu', 'false');

-- Response and answers for the third question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is the chemical formula for table salt?', 'true');

INSERT INTO answer (response_id, text)
VALUES (3, 'NaCl');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (3, 'NaCl', 'true'),
       (3, 'NaOH', 'false'),
       (3, 'H2SO4', 'false'),
       (3, 'HCl', 'false');

-- Response and answers for the fourth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'Which element is a noble gas?', 'true');

INSERT INTO answer (response_id, text)
VALUES (4, 'Helium');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (4, 'Helium', 'true'),
       (4, 'Neon', 'false'),
       (4, 'Argon', 'false'),
       (4, 'Sodium', 'false');

-- Response and answers for the fifth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is the chemical formula for methane?', 'false');

INSERT INTO answer (response_id, text)
VALUES (5, 'CO2');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (5, 'CH4', 'true'),
       (5, 'CO2', 'false'),
       (5, 'H2SO4', 'false'),
       (5, 'NH3', 'false');

-- Response and answers for the sixth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'Which gas is essential for respiration?', 'false');

INSERT INTO answer (response_id, text)
VALUES (6, 'Carbon dioxide');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (6, 'Oxygen', 'true'),
       (6, 'Carbon dioxide', 'false'),
       (6, 'Nitrogen', 'false'),
       (6, 'Hydrogen', 'false');

-- Response and answers for the seventh question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is the chemical symbol for sodium?', 'false');

INSERT INTO answer (response_id, text)
VALUES (7, '');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (7, 'Na', 'true'),
       (7, 'K', 'false'),
       (7, 'Fe', 'false'),
       (7, 'Mg', 'false');

-- Response and answers for the eighth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'Which elements are gases at room temperature?', 'true');

INSERT INTO answer (response_id, text)
VALUES (8, 'Oxygen, Nitrogen');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (8, 'Oxygen', 'true'),
       (8, 'Nitrogen', 'true'),
       (8, 'Carbon', 'false'),
       (8, 'Helium', 'false');

-- Response and answers for the ninth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'What is the chemical formula for water?', 'false');

INSERT INTO answer (response_id, text)
VALUES (9, 'NaCl');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (9, 'H2O', 'true'),
       (9, 'CO2', 'true'),
       (9, 'NaCl', 'false'),
       (9, 'Helium', 'false');

-- Response and answers for the tenth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (1, 'Which of the following are halogens?', 'true');

INSERT INTO answer (response_id, text)
VALUES (10, 'Fluorine, Chlorine');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (10, 'Fluorine', 'true'),
       (10, 'Chlorine', 'true'),
       (10, 'Sodium', 'false'),
       (10, 'Potassium', 'false');

-- QUIZ 2
-- Response and answers for the first question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the sum of 5 + 7?', 'true');

INSERT INTO answer (response_id, text)
VALUES (11, '12');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (11, '12', 'true'),
       (11, '10', 'false'),
       (11, '15', 'false'),
       (11, '8', 'false');

-- Response and answers for the second question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the product of 3 * 4?', 'true');

INSERT INTO answer (response_id, text)
VALUES (12, '12');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (12, '12', 'true'),
       (12, '10', 'false'),
       (12, '15', 'false'),
       (12, '8', 'false');

-- Response and answers for the third question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the square root of 16?', 'true');

INSERT INTO answer (response_id, text)
VALUES (13, '4');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (13, '4', 'true'),
       (13, '5', 'false'),
       (13, '6', 'false'),
       (13, '7', 'false');

-- Response and answers for the fourth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is 20% of 50?', 'false');

INSERT INTO answer (response_id, text)
VALUES (14, '10');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (14, '10', 'true'),
       (14, '15', 'false'),
       (14, '25', 'false'),
       (14, '30', 'false');

-- Response and answers for the fifth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the next number in the sequence: 2, 4, 6, 8, ...?', 'true');

INSERT INTO answer (response_id, text)
VALUES (15, '10');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (15, '10', 'true'),
       (15, '8', 'false'),
       (15, '12', 'false'),
       (15, '15', 'false');

-- Response and answers for the sixth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the value of π (pi)?', 'true');

INSERT INTO answer (response_id, text)
VALUES (16, '3.14');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (16, '3.14', 'true'),
       (16, '3.15', 'false'),
       (16, '3.12', 'false'),
       (16, '3.10', 'false');

-- Response and answers for the seventh question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the area of a rectangle with length 5 and width 10?', 'true');

INSERT INTO answer (response_id, text)
VALUES (17, '50');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (17, '50', 'true'),
       (17, '40', 'false'),
       (17, '60', 'false'),
       (17, '70', 'false');

-- Response and answers for the eighth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the volume of a cube with side length 3?', 'true');

INSERT INTO answer (response_id, text)
VALUES (18, '27');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (18, '27', 'true'),
       (18, '30', 'false'),
       (18, '25', 'false'),
       (18, '20', 'false');

-- Response and answers for the ninth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the difference between 10 and 5?', 'true');

INSERT INTO answer (response_id, text)
VALUES (19, '5');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (19, '5', 'true'),
       (19, '6', 'false'),
       (19, '4', 'false'),
       (19, '3', 'false');

-- Response and answers for the tenth question
INSERT INTO response (quiz_history_id, questionName, isCorrect)
VALUES (2, 'What is the perimeter of a square with side length 7?', 'true');

INSERT INTO answer (response_id, text)
VALUES (20, '28');

INSERT INTO answer_field (response_id, title, isCorrect)
VALUES (20, '28', 'true'),
       (20, '30', 'false'),
       (20, '25', 'false'),
       (20, '20', 'false');


CREATE TABLE IF NOT EXISTS user_stats (
    user_stats_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Foreign key referencing the user table
    points INT,
    ranking INT,
    totalAttempts INT,
    passedAttempts INT,
    failedAttempts INT,
    scienceAttempts INT,
    mathematicsAttempts INT,
    historyAttempts INT,
    literatureAttempts INT,
    geographyAttempts INT,
    languagesAttempts INT,
    sportsAttempts INT,
    musicAttempts INT,
    moviesAttempts INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS user_monthly_points (
    month_id INT AUTO_INCREMENT PRIMARY KEY,
    user_stats_id INT, -- Foreign key referencing the user_stats table
    month_year DATE, 
    points INT,
    FOREIGN KEY (user_stats_id) REFERENCES user_stats(user_stats_id)
);

-- Insert data into user_stats table
INSERT INTO user_stats (user_id, points, ranking, totalAttempts, passedAttempts, failedAttempts, scienceAttempts, mathematicsAttempts, historyAttempts, literatureAttempts, geographyAttempts, languagesAttempts, sportsAttempts, musicAttempts, moviesAttempts)
VALUES 
    (1, 500, 1, 100, 80, 20, 50, 30, 10, 20, 10, 5, 15, 10, 5),
    (2, 700, 2, 120, 100, 20, 60, 40, 20, 30, 20, 10, 20, 15, 10),
    (3, 300, 3, 80, 60, 20, 40, 20, 10, 10, 10, 5, 10, 5, 5),
    (4, 900, 4, 150, 130, 20, 70, 50, 30, 40, 30, 15, 30, 20, 15),
    (5, 600, 5, 110, 90, 20, 50, 30, 20, 25, 15, 10, 20, 10, 15);

-- Insert data into user_monthly_points table
INSERT INTO user_monthly_points (user_stats_id, month_year, points)
VALUES 
    (1, '2024-01-01', 100),
    (1, '2024-02-01', 150),
    (1, '2024-03-01', 250),
    (2, '2024-01-01', 120),
    (2, '2024-02-01', 180),
    (2, '2024-03-01', 400),
    (3, '2024-01-01', 80),
    (3, '2024-02-01', 120),
    (3, '2024-03-01', 100),
    (4, '2024-01-01', 200),
    (4, '2024-02-01', 350),
    (4, '2024-03-01', 350),
    (5, '2024-01-01', 150),
    (5, '2024-02-01', 200),
    (5, '2024-03-01', 250);
    
SELECT 
    q.quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.category AS quiz_category,
    q.duration AS quiz_duration,
    q.numberOfQuestions AS number_of_questions,
    qn.title AS question_title,
    qn.type AS question_type,
    qf.title AS field_title,
    qf.isCorrect AS field_is_correct 
FROM 
    quiz q 
JOIN 
    question qn ON qn.quiz_id = q.quiz_id 
JOIN 
    question_field qf ON qf.question_id = qn.question_id 
WHERE 
    q.quiz_id = 4;

select quiz_id, title, description, category, duration, numberOfQuestions FROM quiz WHERE quiz_id = 4;
select title,type FROM question WHERE quiz_id = 4;
select * from question_field WHERE question_id = 4;

SELECT 
    q.title, 
    q.type, 
    GROUP_CONCAT(qf.title) as fieldNames, 
    GROUP_CONCAT(qf.isCorrect) as isCorrect
FROM 
    question q
JOIN 
    question_field qf ON q.question_id = qf.question_id
WHERE 
    q.quiz_id = 1
GROUP BY 
    q.title, 
    q.type;


SELECT * FROM question;
select user_id from user where email = "alice.smith@example.com";
select * from user_stats;
select u.firstName, u.lastName, u.avatar , us.points , us.totalAttempts,
us.scienceAttempts , us.mathematicsAttempts, us.historyAttempts, us.literatureAttempts, us.geographyAttempts, us.languagesAttempts, us.sportsAttempts, us.musicAttempts, us.moviesAttempts
FROM user u JOIN user_stats us ON u.user_id = us.user_stats_id order by(us.points) DESC LIMIT 10;

select a.title, a.description FROM user_achievements u JOIN achievement a ON a.achievement_id = u.user_achievement_id JOIN user usr ON usr.user_id = u.user_id WHERE usr.email = "bob.johnson@example.com";
select * from quiz_history qh JOIN quiz q ON q.title = qh.title;

select qh.quiz_history_id, qh.category,qh.title, qh.dateTaken, qh.timeTaken, qh.amountOfQuestions, qh.correctAnswers, u.user_id,qz.quiz_id from quiz_history qh 
JOIN user u ON qh.user_id = u.user_id JOIN quiz qz ON qz.title = qh.title WHERE u.email = "john.doe@example.com";