INSERT INTO user (id,email,password, firstName, lastName, role, category, avatar, joinDate, dateOfBirth, country, age)
VALUES 
    ('42994af1-612b-46a2-b8f5-63f70038114e', 'john.doe@example.com', '$2y$10$49a1xdow1Qkl64XcNoDgWe8I7hoR.8V85gsOXANeZ7N4MGt1E2seC', 'John', 'Doe', 'user', 'educator', 4 , '2023-03-11', '1990-05-15', 'USA', 19), -- password: sadas4asd
    ('765909b0-7297-4c62-ae90-0bdd41a596be', 'alice.smith@example.com', '$2y$10$acI1NxKxdXgC7JwQzWvMWOifjL.K0I5.jP4ksnZoHzaghwnq7xTAO', 'Alice', 'Smith', 'user', 'quiz enthusiast', 3, '2023-07-02', '1995-07-20', 'Canada', 34), -- password: #$sfasf
    ('438d407c-b67a-4aff-8d16-96a08c4bd8ad','bob.johnson@example.com', '$2y$10$Nnf4W/75wruybapHyIsIHe6KCqMIjqHmxyKI9pRjBG0ZcU40uH.TS', 'Bob', 'Johnson', 'user', 'student', 5, '2023-03-07', '1988-11-10', 'UK',21), -- password: hipposlol
    ('d45426d6-1ae4-42ad-b27a-0f418d54856f', 'emily.brown@example.com', '$2y$10$DQrjSfd2HI00.f/MJZDcteKMHxVUY6zFIbqFCRyGt4ib.GEsp3eFa', 'Emily', 'Brown', 'admin', 'student', 4, '2023-06-04', '1992-03-25', 'Australia', 23), -- password: osdasdsd
    ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 'faris.muhovic@stu.ibu.edu.ba', '$2y$10$AzdEKvrCCDJYBQC7/J0riOy.XiaX/koCLjG77rZ9LqIzx5rLVwEn2', 'Faris', 'Muhovic', 'admin', 'student', 8, '2023-04-05', '2002-09-30', 'Germany', 25); -- password: farisfare
   
INSERT INTO achievement (title, banner, description)
VALUES 
    ('Quiz Master', 'masterimage','Congratulations! You''ve completed 50 quizzes.'),
    ('Knowledge Explorer','booksimage', 'Well done! You''ve explored quizzes in 5 different categories.'),
    ('Speed Demon', 'speedimage', 'Impressive! You''ve completed a quiz in under 1 minute.'),
    ('Dedicated Learner', 'bigbrainimage', 'Keep it up! You''ve spent over 10 hours learning with quizzes.'),
    ('Quiz Champion', 'trophyimage' , 'You''re a true quiz champion! Completed quizzes with a score of 100%.'),
    ('Category Explorer', 'explorerimage','Explore quizzes in 10 different categories and expand your knowledge horizons.');

INSERT INTO user_achievement (user_id, achievement_id)
VALUES
    ('42994af1-612b-46a2-b8f5-63f70038114e', 1),
    ('42994af1-612b-46a2-b8f5-63f70038114e', 4),
    ('42994af1-612b-46a2-b8f5-63f70038114e', 5),
    ('438d407c-b67a-4aff-8d16-96a08c4bd8ad', 3),
    ('438d407c-b67a-4aff-8d16-96a08c4bd8ad', 2),
    ('438d407c-b67a-4aff-8d16-96a08c4bd8ad', 5),
    ('d45426d6-1ae4-42ad-b27a-0f418d54856f', 1),
    ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 4),
    ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 5),
    ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 1),
    ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 3);

INSERT INTO quiz (title, description, category, bannerImage, altText, duration, numberOfQuestions, dateCreated)
VALUES 
    ('The Element-ary Challenge', 'Test your knowledge of fundamental concepts in chemistry with this introductory quiz. Covering topics such as atomic structure, chemical reactions, and the periodic table, this quiz is suitable for beginners and enthusiasts alike.', 'Science', 'science', 'Science banner', 30, 10, '2023-06-24'),
    ('Number Crunchin'' Challenge', 'Dive into the world of numbers and patterns. This quiz covers everything from basic arithmetic to more challenging algebra and geometry problems. Perfect for sharpening your mathematical skills.', 'Math', 'math', 'Math banner', 45, 10, '2023-06-24'),
    ('Who Wrote That?', 'From classic novels to contemporary poetry, test your knowledge of literary masterpieces and the authors who penned them. A quiz for true book lovers and literature enthusiasts.', 'Literature', 'literature', 'Literature banner', 35, 10, '2023-06-24'),
    ('Globe-Trotting Trivia', 'Journey through diverse landscapes, from the highest mountains to the deepest oceans. Test your knowledge of world geography, countries, capitals, and natural wonders.', 'Geography', 'geography', 'Geography banner', 25, 10, '2023-06-24'),
    ('Melody Master', 'From classical symphonies to modern pop hits, test your knowledge across various music genres and eras. Discover the composers, performers, and songs that have left their mark on the world of music.', 'Music', 'music', 'Music banner', 35, 10, '2023-06-24'),
    ('Civilizations and Conflicts', 'Explore major historical events from around the globe with this comprehensive quiz. Test your knowledge on everything from ancient civilizations to modern conflicts.', 'History', 'history', 'History banner', 40, 10, '2023-06-24'),
    ('Silver Screen Classics', 'Calling all cinephiles! Put your movie knowledge to the test with this quiz on classic films. From golden age Hollywood to cult favorites, this quiz covers a wide range of genres and eras.', 'Movies', 'movies', 'Movie banner', 30, 10, '2023-06-24'),
    ('World Languages', 'Are you a language enthusiast? Test your knowledge of different languages from around the world in this quiz. You might encounter interesting facts, trivia, and pronunciation challenges.', 'Languages', 'languages', 'Language banner', 20, 10, '2023-06-24'),
    ('The Sporting World', 'Do you consider yourself a sports fanatic? This quiz tests your knowledge on various sports, athletes, and iconic moments. Get ready to answer trivia on everything from football to gymnastics!', 'Sports', 'sport', 'Sports banner', 35, 10, '2023-06-24');

INSERT INTO question (quiz_id, title, type)
VALUES 
    (1, 'What is the smallest unit of an element that maintains the properties of that element', 'MCQ'),
    (1, 'What part of the atom has a negative charge', 'MCQ'),
    (1, 'Which of the following statements accurately describes the process of nuclear fusion?', 'MCQ'),
    (1, 'Which principle(s) explain(s) why no two electrons in an atom can have the same four quantum numbers', 'MCQ'),
    (1, 'Which subatomic particle(s) make(s) up the nucleus of an atom', 'MRQ'),
    (1, 'The arrangement of electrons around the nucleus of an atom in shells is best described by which model', 'MCQ'),
    (1, 'Which element is known as the building block of life and is a key component of all organic compounds', 'MCQ'),
    (1, 'What type of reaction involves an exchange of electrons between two elements', 'MCQ'),
    (1, 'Who developed the periodic table', 'MCQ'),
    (1, 'What is the atomic number of an element defined as', 'MCQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES 
    (1, 'Atom', 1),
    (1, 'Molecule', 0),
    (1, 'Compound', 0),
    (1, 'Electron', 0),
    
    (2, 'Proton', 0),
    (2, 'Neutron', 0),
    (2, 'Electron', 1),
    (2, 'Nucleus', 0),

    (3, 'It involves the splitting of heavy atomic nuclei into lighter nuclei.', 0),
    (3, 'It releases energy by combining light atomic nuclei to form heavier nuclei.', 1),
    (3, 'It is the process by which radioactive isotopes decay into stable isotopes.', 0),
    (3, 'It occurs naturally in nuclear reactors as a result of radioactive decay.', 0),

    (4, 'Aufbau Principle', 0),
    (4, 'Hunds Rule', 0),
    (4, 'Pauli Exclusion Principle', 1),
    (4, 'Heisenberg Uncertainty Principle', 0),

    (5, 'Proton', 1),
    (5, 'Neutron', 1),
    (5, 'Electron', 0),
    (5, 'Photon', 0),

    (6, 'Bohr Model', 1),
    (6, 'Quantum Mechanical Model', 0),
    (6, 'Daltons Model', 0),
    (6, 'Thomsons Model', 0),

    (7, 'Oxygen', 0),
    (7, 'Carbon', 1),
    (7, 'Hydrogen', 0),
    (7, 'Nitrogen', 0),

    (8, 'Decomposition', 0),
    (8, 'Synthesis', 0),
    (8, 'Redox', 1),
    (8, 'Precipitation', 0),

    (9, 'Isaac Newton', 0),
    (9, 'Albert Einstein', 0),
    (9, 'Dmitri Mendeleev', 1),
    (9, 'Marie Curie', 0),

    (10, 'The number of protons in the nucleus', 1),
    (10, 'The total number of protons and neutrons', 0),
    (10, 'The number of electrons around the nucleus', 0),
    (10, 'The total mass of the atom', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (2, 'What is the value of π (pi) approximately', 'MCQ'),
    (2, 'What is the area of a circle with radius 5 units', 'MCQ'),
    (2, 'In a right triangle, what is the length of the hypotenuse if the legs measure 3 units and 4 units, respectively', 'MCQ'),
    (2, 'What is the volume of a cube with edge length 6 units', 'MCQ'),
    (2, 'What is the value of sin⁡(30 degrees)', 'MCQ'),
    (2, 'What is the surface area of a sphere with radius 10 units? (Use ππ = 3.14)', 'MCQ'),
    (2, 'What is the equation of the line passing through the points (-1, 3) and (2, -4)', 'MCQ'),
    (2, 'Which of the following are Pythagorean triplets', 'MRQ'),
    (2, 'Which of the following are solutions to the equation 2x−3=92x−3=9', 'MRQ'),
    (2, 'Which of the following pairs of numbers are factors of 24', 'MRQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES
    (11, '3.14', 1),
    (11, '4.669', 0),
    (11, '2.618', 0),
    (11, '3.21532', 0),
    
    (12, '5π square units', 0),
    (12, '10π square units', 0),
    (12, '50π square units', 0),
    (12, '25π square units', 1),

    (13, '5 units', 1),
    (13, '6 units', 0),
    (13, '4 units', 0),
    (13, '7 units', 0),

    (14, '72 cubic units', 0),
    (14, '144 cubic units', 0),
    (14, '36 cubic units', 0),
    (14, '216 cubic units', 1),

    (15, '0.5', 1),
    (15, '0.632', 0),
    (15, '0.735', 0),
    (15, '0.577', 0),

    (16, '1250π square units', 0),
    (16, '1750π square units', 0),
    (16, '1360π square units', 0),
    (16, '1500π square units', 1),

    (17, 'y = -7/3x - 2/3', 0),
    (17, 'y = 7/3x + 2/3', 0),
    (17, 'y = 7/3x - 2/3', 0),
    (17, 'y = -7/3x + 2/3', 1),

    (18, '(3, 4, 5)', 1),
    (18, '(6, 9, 11)', 0),
    (18, '(5, 12, 13)', 1),
    (18, '(8, 15, 17)', 0),

    (19, '3', 0),
    (19, '-6', 0),
    (19, '6', 1),
    (19, '-3', 1),

    (20, '5', 0),
    (20, '2', 1),
    (20, '8', 0),
    (20, '6', 1),
    (20, '12', 1);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (3, 'Who is the author of Romeo and Juliet?', 'MCQ'),
    (3, 'Which author wrote the novel To Kill a Mockingbird?', 'MCQ'),
    (3, 'Who wrote the famous play Hamlet?', 'MCQ'),
    (3, 'Which author is known for the novel Pride and Prejudice?', 'MCQ'),
    (3, 'Who is the author of the epic poem Paradise Lost?', 'MCQ'),
    (3, 'Which writer is known for the novel Moby-Dick?', 'MCQ'),
    (3, 'Who wrote the dystopian novel 1984?', 'MCQ'),
    (3, 'Which author wrote the poem The Waste Land?', 'MCQ'),
    (3, 'Which of the following authors wrote both Dracula and Frankenstein?', 'MRQ'),
    (3, 'Which of the following literary works is attributed to Miguel de Cervantes?', 'MRQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES
    (21, 'William Shakespeare', 1),
    (21, 'Jane Austen', 0),
    (21, 'Charles Dickens', 0),
    (21, 'Mark Twain', 0),
    
    (22, 'Harper Lee', 1),
    (22, 'J.K. Rowling', 0),
    (22, 'Ernest Hemingway', 0),
    (22, 'F. Scott Fitzgerald', 0),
    
    (23, 'William Shakespeare', 1),
    (23, 'George Orwell', 0),
    (23, 'Emily Brontë', 0),
    (23, 'Leo Tolstoy', 0),
    
    (24, 'Jane Austen', 1), 
    (24, 'Charles Dickens', 0),
    (24, 'Emily Dickinson', 0),
    (24, 'F. Scott Fitzgerald', 0),
    
    (25, 'John Milton', 1), 
    (25, 'Dante Alighieri', 0),
    (25, 'Geoffrey Chaucer', 0),
    (25, 'John Donne', 0),
    
    (26, 'Herman Melville', 1),
    (26, 'Nathaniel Hawthorne', 0),
    (26, 'Mark Twain', 0),
    (26, 'Emily Dickinson', 0),
    
    (27, 'George Orwell', 1),
    (27, 'Aldous Huxley', 0),
    (27, 'Ray Bradbury', 0),
    (27, 'H.G. Wells', 0),
    
    (28, 'T.S. Eliot', 1), 
    (28, 'Robert Frost', 0),
    (28, 'William Wordsworth', 0),
    (28, 'W.B. Yeats', 0),
    
    (29, 'Bram Stoker', 1), 
    (29, 'Mary Shelley', 1),
    (29, 'Edgar Allan Poe', 0),
    (29, 'H.P. Lovecraft', 0),
    
    (30, 'Don Quixote', 1),
    (30, 'Les Misérables', 0),
    (30, 'The Odyssey', 0),
    (30, 'The Great Gatsby', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (4, 'What is the capital city of Australia?', 'MCQ'),
    (4, 'Which river is the longest in the world?', 'MCQ'),
    (4, 'Which country is known as the Land of the Rising Sun?', 'MCQ'),
    (4, 'What is the largest ocean on Earth?', 'MCQ'),
    (4, 'Which continent is the driest on Earth?', 'MCQ'),
    (4, 'What is the capital city of Canada?', 'MCQ'),
    (4, 'Which mountain range is the longest in the world?', 'MRQ'),
    (4, 'Which country is known as the Land of Fire and Ice?', 'MCQ'),
    (4, 'What is the largest desert in the world?', 'MRQ'),
    (4, 'Which city is the capital of Brazil?', 'MCQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES
    (31, 'Sydney', 0),
    (31, 'Canberra', 1),
    (31, 'Melbourne', 0),
    (31, 'Perth', 0),
    
    (32, 'Nile', 1),
    (32, 'Amazon', 0),
    (32, 'Yangtze', 0),
    (32, 'Mississippi', 0),
    
    (33, 'China', 0),
    (33, 'Japan', 1),
    (33, 'India', 0),
    (33, 'South Korea', 0),
    
    (34, 'Atlantic Ocean', 0), 
    (34, 'Indian Ocean', 0),
    (34, 'Arctic Ocean', 0),
    (34, 'Pacific Ocean', 1),
    
    (35, 'Asia', 0), 
    (35, 'Africa', 0),
    (35, 'Australia', 1),
    (35, 'Antarctica', 0),
    
    (36, 'Toronto', 0),
    (36, 'Vancouver', 0),
    (36, 'Montreal', 0),
    (36, 'Ottawa', 1),
    
    (37, 'Himalayas', 1),
    (37, 'Andes', 1),
    (37, 'Rockies', 0),
    (37, 'Alps', 0),
    
    (38, 'Iceland', 1), 
    (38, 'Greenland', 0),
    (38, 'Norway', 0),
    (38, 'Sweden', 0),
    
    (39, 'Sahara Desert', 1), 
    (39, 'Gobi Desert', 0),
    (39, 'Arabian Desert', 0),
    (39, 'Antarctic Desert', 1),
    
    (40, 'Rio de Janeiro', 0),
    (40, 'Brasília', 1),
    (40, 'São Paulo', 0),
    (40, 'Salvador', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (5, 'Who composed the famous symphony Symphony No. 5?', 'MCQ'),
    (5, 'Which musical genre originated in New Orleans and is characterized by its lively rhythms and improvisation?', 'MCQ'),
    (5, 'Who is known as the King of Pop?', 'MCQ'),
    (5, 'Which instrument is known as the King of Instruments?', 'MCQ'),
    (5, 'Which of the following composers is known for his famous Four Seasons compositions?', 'MCQ'),
    (5, 'Which musical era is known for its emphasis on emotion, individualism, and the use of contrasting elements?', 'MCQ'),
    (5, 'Which of the following are subgenres of rock music?', 'MRQ'),
    (5, 'Who is known for his famous guitar solo in the song Stairway to Heaven?', 'MRQ'),
    (5, 'Which composer is famous for his Moonlight Sonata?', 'MCQ'),
    (5, 'Which music style originated in Jamaica and is known for its offbeat rhythms and syncopated melodies?', 'MCQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES
    (41, 'Ludwig van Beethoven', 1),
    (41, 'Wolfgang Amadeus Mozart', 0),
    (41, 'Johann Sebastian Bach', 0),
    (41, 'Franz Schubert', 0),
    
    (42, 'Jazz', 1),
    (42, 'Blues', 0),
    (42, 'Rock and Roll', 0),
    (42, 'Hip Hop', 0),
    
    (43, 'Michael Jackson', 1),
    (43, 'Elvis Presley', 0),
    (43, 'Madonna', 0),
    (43, 'Prince', 0),
    
    (44, 'Piano', 0), 
    (44, 'Violin', 0),
    (44, 'Guitar', 0),
    (44, 'Organ', 1),
    
    (45, 'Johann Sebastian Bach', 0), 
    (45, 'Ludwig van Beethoven', 0),
    (45, 'Wolfgang Amadeus Mozart', 0),
    (45, 'Antonio Vivaldi', 1),
    
    (46, 'Baroque', 0),
    (46, 'Romantic', 1),
    (46, 'Classical', 0),
    (46, 'Renaissance', 0),
    
    (47, 'Punk', 1),
    (47, 'Heavy Metal', 1),
    (47, 'Jazz', 0),
    (47, 'Reggae', 0),
    
    (48, 'Jimi Hendrix', 1), 
    (48, 'Jimmy Page', 0),
    (48, 'Eric Clapton', 1),
    (48, 'Carlos Santana', 0),
    
    (49, 'Franz Liszt', 0), 
    (49, 'Frédéric Chopin', 0),
    (49, 'Ludwig van Beethoven', 1),
    (49, 'Johann Sebastian Bach', 0),
    
    (50, 'Ska', 1),
    (50, 'Flamenco', 0),
    (50, 'Bossa Nova', 0),
    (50, 'Tango', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (6, 'Who is credited with the unification of Upper and Lower Egypt, forming the first Egyptian dynasty around 3100 BCE?', 'MCQ'),
    (6, 'Which ancient civilization is known for its advanced city planning, sewage systems, and grid-like street layout?', 'MCQ'),
    (6, 'Who was the first emperor of the Maurya Empire in ancient India, known for his contributions to Buddhism and the spread of his empire across much of the Indian subcontinent?', 'MCQ'),
    (6, 'What major event marked the end of the Western Roman Empire in 476 CE?', 'MCQ'),
    (6, 'Which of the following civilizations developed the first known writing system, known as cuneiform?', 'MCQ'),
    (6, 'Which of the following were major causes of the French Revolution?', 'MRQ'),
    (6, 'Who was the leader of the Bolshevik Party during the Russian Revolution of 1917?', 'MCQ'),
    (6, 'Which ancient empire was known for its extensive network of roads, administrative efficiency, and adoption of Christianity as the state religion under Emperor Constantine?', 'MCQ'),
    (6, 'Which conflict, fought from 1914 to 1918, involved many of the world''s great powers and is often referred to as the Great War?', 'MCQ'),
    (6, 'Which of the following factors contributed to the decline of the Roman Empire? (Select all that apply)', 'MRQ');


INSERT INTO question_field (question_id, title, isCorrect)
VALUES
    (51, 'Narmer', 1),
    (51, 'Hatshepsut', 0),
    (51, 'Thutmose III', 0),
    (51, 'Akhenaten', 0),
    
    (52, 'Mesopotamian Civilization', 0),
    (52, 'Egyptian Civilization', 0),
    (52, 'Indus Valley Civilization', 1),
    (52, 'Greek Civilization', 0),
    
    (53, 'Ashoka the Great', 0),
    (53, 'Bindusara', 0),
    (53, 'Bimbisara', 0),
    (53, 'Chandragupta Maurya', 1),
    
    (54, 'Battle of Adrianople', 0), 
    (54, 'Fall of Rome', 1),
    (54, 'Sack of Rome', 0),
    (54, 'Roman Civil War', 0),
    
    (55, 'Sumerians', 1), 
    (55, 'Egyptians', 0),
    (55, 'Greeks', 0),
    (55, 'Chinese', 0),

    (56, 'Social Inequality', 1),
    (56, 'Economic Crisis', 1),
    (56, 'Religious Conflict', 0),
    (56, 'Enlightenment Ideas', 1),
    
    (57, 'Vladimir Lenin', 1),
    (57, 'Joseph Stalin', 0),
    (57, 'Leon Trotsky', 0),
    (57, 'Nicholas II', 0),
    
    (58, 'Persian Empire', 0), 
    (58, 'Greek Empire', 0),
    (58, 'Roman Empire', 1),
    (58, 'Ottoman Empire', 0),
    
    (59, 'Napoleonic Wars', 0), 
    (59, 'American Civil War', 0),
    (59, 'World War II', 0),
    (59, 'World War I', 1),
    
    (60, 'Economic Decline', 1),
    (60, 'Military Overextension', 1),
    (60, 'Cultural Isolation', 0),
    (60, 'Barbarian Invasions', 1);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (7, 'Who directed the 1972 film The Godfather?', 'MCQ'),
    (7, 'Which movie won the Academy Award for Best Picture in 1994?', 'MCQ'),
    (7, 'Who played the role of Rick Blaine in the movie Casablanca?', 'MCQ'),
    (7, 'Which of the following actors played James Bond in the official EON Productions film series? (Select all that apply)', 'MRQ'),
    (7, 'Which of the following movies were directed by Alfred Hitchcock? (Select all that apply)', 'MRQ'),
    (7, 'Who played the lead role in the movie Gone with the Wind?', 'MCQ'),
    (7, 'Which of the following actors starred in the movie The Godfather? (Select all that apply)', 'MRQ'),
    (7, 'Who directed the film Psycho?', 'MCQ'),
    (7, 'In which movie does the character Travis Bickle famously say, You talkin to me??', 'MCQ'),
    (7, 'Which of the following actors portrayed characters in the movie The Shawshank Redemption? (Select all that apply)', 'MRQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES 
    (61, 'Francis Ford Coppola', 1),
    (61, 'Martin Scorsese', 0),
    (61, 'Quentin Tarantino', 0),
    (61, 'Steven Spielberg', 0),

    (62, 'Forrest Gump', 1),
    (62, 'The Shawshank Redemption', 0),
    (62, 'Pulp Fiction', 0),
    (62, 'Schindler''s List', 0),

    (63, 'Humphrey Bogart', 1),
    (63, 'Clark Gable', 0),
    (63, 'Cary Grant', 0),
    (63, 'Marlon Brando', 0),

    (64, 'Sean Connery', 1), 
    (64, 'Roger Moore', 1),
    (64, 'Pierce Brosnan', 1),
    (64, 'Daniel Craig', 1),

    (65, 'Vertigo', 1),
    (65, 'North by Northwest', 1),
    (65, 'Rear Window', 1),
    (65, 'Psycho', 0),

    (66, 'Vivien Leigh', 1),
    (66, 'Audrey Hepburn', 0),
    (66, 'Katharine Hepburn', 0),
    (66, 'Grace Kelly', 0),

    (67, 'Marlon Brando', 1),
    (67, 'Al Pacino', 1),
    (67, 'Robert De Niro', 1),
    (67, 'James Caan', 0),

    (68, 'Alfred Hitchcock', 1), 
    (68, 'Stanley Kubrick', 0),
    (68, 'Martin Scorsese', 0),
    (68, 'Steven Spielberg', 0),

    (69, 'Taxi Driver', 1),
    (69, 'Raging Bull', 0),
    (69, 'Goodfellas', 0),
    (69, 'Mean Streets', 0),

    (70, 'Morgan Freeman', 1),
    (70, 'Tim Robbins', 1),
    (70, 'Tom Hanks', 0),
    (70, 'James Whisker', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (8, 'Which language is the most widely spoken in the world?', 'MCQ'),
    (8, 'What is the official language of Brazil?', 'MCQ'),
    (8, 'Which of the following are Romance languages? (Select all that apply)', 'MRQ'),
    (8, 'Which writing system is used for the Japanese language?', 'MCQ'),
    (8, 'Which of the following are official languages of Canada? (Select all that apply)', 'MRQ'),
    (8, 'What is the most widely spoken language in Africa?', 'MCQ'),
    (8, 'Which of the following languages belong to the Germanic language family? (Select all that apply)', 'MRQ'),
    (8, 'What is the official language of Japan?', 'MCQ'),
    (8, 'In which country is Urdu the official language?', 'MCQ'),
    (8, 'Which of the following languages are classified as Semitic languages? (Select all that apply)', 'MRQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES 
    (71, 'Mandarin Chinese', 1),
    (71, 'English', 0),
    (71, 'Spanish', 0),
    (71, 'Hindi', 0),

    (72, 'Portuguese', 1),
    (72, 'Spanish', 0),
    (72, 'English', 0),
    (72, 'French', 0),

    (73, 'Italian', 1),
    (73, 'Russian', 0),
    (73, 'French', 1),
    (73, 'German', 0),

    (74, 'Katakana and Hiragana', 1),
    (74, 'Roman alphabet', 0),
    (74, 'Cyrillic alphabet', 0),
    (74, 'Arabic script', 0),

    (75, 'English', 1),
    (75, 'French', 1),
    (75, 'Spanish', 0),
    (75, 'Mandarin Chinese', 0),

    (76, 'Arabic', 1),
    (76, 'Swahili', 0),
    (76, 'English', 0),
    (76, 'French', 0),

    (77, 'German', 1),
    (77, 'Spanish', 0),
    (77, 'Dutch', 1),
    (77, 'Russian', 0),

    (78, 'Japanese', 1),
    (78, 'Mandarin Chinese', 0),
    (78, 'Korean', 0),
    (78, 'English', 0),

    (79, 'Pakistan', 1),
    (79, 'India', 0),
    (79, 'Bangladesh', 0),
    (79, 'Afghanistan', 0),

    (80, 'Arabic', 1),
    (80, 'Hebrew', 1),
    (80, 'Swahili', 0),
    (80, 'Persian', 0);

INSERT INTO question (quiz_id, title, type)
VALUES 
    (9, 'Who holds the record for the most Olympic gold medals in history?', 'MCQ'),
    (9, 'Which country won the FIFA World Cup in 2018?', 'MCQ'),
    (9, 'Who is widely regarded as the greatest basketball player of all time?', 'MCQ'),
    (9, 'Which of the following sports are part of the modern Olympic Games? (Select all that apply)', 'MRQ'),
    (9, 'Which of the following athletes have won the FIFA Ballon d''Or award? (Select all that apply)', 'MRQ'),
    (9, 'Which team has won the most Super Bowl titles in NFL history?', 'MCQ'),
    (9, 'Which of the following are considered Grand Slam tennis tournaments? (Select all that apply)', 'MRQ'),
    (9, 'Who holds the record for the most goals scored in a single FIFA World Cup tournament?', 'MCQ'),
    (9, 'In which sport would you perform a slam dunk?', 'MCQ'),
    (9, 'Which of the following athletes have won the Tour de France multiple times? (Select all that apply)', 'MRQ');

INSERT INTO question_field (question_id, title, isCorrect)
VALUES 
    (81, 'Michael Phelps', 1),
    (81, 'Usain Bolt', 0),
    (81, 'Simone Biles', 0),
    (81, 'Serena Williams', 0),
    
    (82, 'France', 1),
    (82, 'Brazil', 0),
    (82, 'Germany', 0),
    (82, 'Argentina', 0),
    
    (83, 'Michael Jordan', 1),
    (83, 'Kobe Bryant', 0),
    (83, 'LeBron James', 0),
    (83, 'Magic Johnson', 0),
    
    (84, 'Swimming', 1),
    (84, 'Table Tennis', 0),
    (84, 'Archery', 1),
    (84, 'Rugby Sevens', 1),
    
    (85, 'Lionel Messi', 1),
    (85, 'Cristiano Ronaldo', 1),
    (85, 'Neymar', 0),
    (85, 'Mohamed Salah', 0),
    
    (86, 'New England Patriots', 1),
    (86, 'Dallas Cowboys', 0),
    (86, 'Green Bay Packers', 0),
    (86, 'Pittsburgh Steelers', 0),
    
    (87, 'Wimbledon', 1),
    (87, 'French Open', 1),
    (87, 'Australian Open', 1),
    (87, 'Davis Cup', 0),
    
    (88, 'Miroslav Klose (Germany)', 1),
    (88, 'Ronaldo (Brazil)', 0),
    (88, 'Pelé (Brazil)', 0),
    (88, 'Just Fontaine (France)', 0),
    
    (89, 'Basketball', 1),
    (89, 'Baseball', 0),
    (89, 'Tennis', 0),
    (89, 'Golf', 0),
    
    (90, 'Lance Armstrong', 1),
    (90, 'Chris Froome', 1),
    (90, 'Alberto Contador', 1),
    (90, 'Mark Cavendish', 0);

INSERT INTO user_stats (user_id, points)
    VALUES ('42994af1-612b-46a2-b8f5-63f70038114e', 250),
     ('765909b0-7297-4c62-ae90-0bdd41a596be', 320),
     ('438d407c-b67a-4aff-8d16-96a08c4bd8ad', 180),
     ('d45426d6-1ae4-42ad-b27a-0f418d54856f', 500),
     ('fa245808-6d07-4630-84d9-aebbb57fdb3e', 150);

INSERT INTO user_attempts (totalAttempts, passedAttempts, failedAttempts, scienceAttempts, mathematicsAttempts, historyAttempts, literatureAttempts, geographyAttempts, languagesAttempts, sportsAttempts, musicAttempts, moviesAttempts)
    VALUES (25, 20, 5, 8, 7, 3, 2, 1, 2, 1, 1, 2),
     (40, 35, 5, 12, 8, 5, 3, 2, 4, 3, 2, 6),
     (15, 10, 5, 4, 3, 2, 1, 0, 0, 1, 0, 3),
     (50, 48, 2, 15, 12, 10, 5, 3, 4, 6, 3, 7),
     (20, 18, 2, 7, 5, 4, 2, 1, 2, 1, 1, 3);
