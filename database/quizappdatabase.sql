select qh.id as quiz_history_id , qh.dateTaken, qh.timeTaken, qh.correctAnswers, q.title, q.description, q.category, q.numberOfQuestions, q.id from quiz_history qh JOIN quiz q ON q.id = qh.quiz_id WHERE user_id = 'd45426d6-1ae4-42ad-b27a-0f418d54856f';


select * from quiz_history qh JOIN quiz q ON q.id = qh.quiz_id;

select * from quiz;

select * from quiz_history;

select * from user;

select * from quiz_answer;

select * from answer;

--         "SELECT q.title, q.type, q.id,
--         GROUP_CONCAT(CONCAT(qf.title, '<.>', qf.isCorrect) SEPARATOR '|') AS fields
--         FROM question q 
--         JOIN question_field qf ON qf.question_id = q.id 
--         WHERE q.quiz_id = :id
--         GROUP BY q.title, q.type, q.id;", ["id" => $ID]
        
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




