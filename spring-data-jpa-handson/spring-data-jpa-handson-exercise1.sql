SHOW DATABASES;
CREATE DATABASE college_db;
SHOW DATABASES;
USE college_db;
CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);
INSERT INTO student VALUES
(1, 'Punya', 21),
(2, 'Shree', 22),
(3, 'Anu', 20);
SELECT * FROM student;
UPDATE student
SET age = 23
WHERE id = 2;
SELECT * FROM student;
DELETE FROM student
WHERE id = 3;
SELECT * FROM student;
INSERT INTO student
VALUES (4, 'Rahul', 19);
SELECT * FROM student;
SELECT * FROM student
WHERE age > 20;
SELECT * FROM student
WHERE age < 22;
SELECT * FROM student
WHERE name = 'Rahul';
SELECT * FROM student
WHERE id = 2;
SELECT * FROM student
ORDER BY age ASC;
SELECT * FROM student
ORDER BY age DESC;
SELECT MAX(age) AS Maximum_Age
FROM student;
SELECT MIN(age) AS Minimum_Age
FROM student;
SELECT AVG(age) AS Average_Age
FROM student;
CREATE TABLE department(
    id INT,
    department VARCHAR(50)
);

INSERT INTO department VALUES
(1,'CSE'),
(2,'ECE'),
(4,'CSE');

SELECT * FROM department;

SELECT department,
COUNT(*) AS Total_Students
FROM department
GROUP BY department;
SELECT department,
COUNT(*) AS Total_Students
FROM department
GROUP BY department
HAVING COUNT(*) > 1;
SELECT department,
COUNT(*) AS Total_Students
FROM department
GROUP BY department
HAVING COUNT(*) = 1;
SELECT * FROM student;
SELECT * FROM department;
SELECT
student.id,
student.name,
student.age,
department.department
FROM student
INNER JOIN department
ON student.id = department.id;
SELECT
s.id,
s.name,
s.age,
d.department
FROM student s
INNER JOIN department d
ON s.id = d.id;
INSERT INTO student
VALUES (5,'Kiran',22);
SELECT * FROM student;
SELECT
s.id,
s.name,
d.department
FROM student s
LEFT JOIN department d
ON s.id = d.id;
INSERT INTO department
VALUES (6,'MECH');
SELECT * FROM department;
SELECT
s.id,
s.name,
d.department
FROM student s
RIGHT JOIN department d
ON s.id = d.id;
