select * from quiz;
select * from question where quiz_id = 1;
select * from question_field ;

SELECT q.title, q.type, q.id,
GROUP_CONCAT(CONCAT(qf.title, ',', qf.isCorrect) SEPARATOR '|') AS fields
FROM question q 
JOIN question_field qf ON qf.question_id = q.id 
WHERE q.quiz_id = 1
GROUP BY q.title, q.type, q.id;


select * from quiz_history;
select * from quiz_answer;
select * from answer;