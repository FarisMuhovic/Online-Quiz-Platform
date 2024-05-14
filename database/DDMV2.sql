select qh.id as quiz_history_id , qh.dateTaken, qh.timeTaken, qh.correctAnswers, q.title, q.description, q.category, q.numberOfQuestions, q.id from quiz_history qh JOIN quiz q ON q.id = qh.quiz_id WHERE user_id = 'd45426d6-1ae4-42ad-b27a-0f418d54856f';

select * from quiz_history qh JOIN quiz q ON q.id = qh.quiz_id;

select * from quiz_history qh
JOIN quiz_answer qa ON qh.id = qa.quiz_history_id
JOIN answer ans ON ans.quiz_answer_id = qa.id
WHERE qh.id = 6;
;
        
SELECT
    qz.title ,
    qz.category ,
    qh.correctAnswers,
    qz.numberOfQuestions,
    q.title,
    ans.title, 
    ans.isCorrect
FROM
    quiz_history qh
JOIN
    quiz qz ON qz.id = qh.quiz_id
JOIN
    question q ON q.quiz_id = qz.id
JOIN
    quiz_answer qa ON qa.quiz_history_id = qh.id
JOIN
    answer ans ON ans.quiz_answer_id = qa.id
JOIN
    user u ON u.id = qh.user_id
WHERE
    u.id = 'd45426d6-1ae4-42ad-b27a-0f418d54856f' and
    qh.id = 2
GROUP BY
    qh.id, q.id, ans.id
ORDER BY
    qh.id, q.id, ans.id;

select q.title, q.category, qh.correctAnswers, q.numberOfQuestions
from quiz_history qh
JOIN quiz q ON q.id = qh.quiz_id
where qh.user_id = "d45426d6-1ae4-42ad-b27a-0f418d54856f" and qh.id = 1;

select u.firstName, u.lastName, u.avatar , us.points , us.totalAttempts,
    us.scienceAttempts , us.mathematicsAttempts, us.historyAttempts, us.literatureAttempts, us.geographyAttempts, us.languagesAttempts, us.sportsAttempts, us.musicAttempts, us.moviesAttempts
    FROM user u JOIN user_stats us ON u.user_id = us.user_stats_id order by(us.points) DESC LIMIT 10;
    
    
select * from user u JOIN user_stats us ON u.id = us.user_id JOIN user_attempts ua ON us.id = ua.id ORDER BY us.points DESC LIMIT 10;
    
SELECT q.title, q.type, q.id,
GROUP_CONCAT(CONCAT(qf.title, ',', qf.isCorrect) SEPARATOR '|') AS fields
FROM question q 
JOIN question_field qf ON qf.question_id = q.id 
WHERE q.quiz_id = 1
GROUP BY q.title, q.type, q.id;