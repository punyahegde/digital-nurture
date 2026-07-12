SELECT
    s.name,
    d.department
FROM student s
CROSS JOIN department d;
CREATE TABLE employee(
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    manager_id INT
);

INSERT INTO employee VALUES
(1,'Amit',NULL),
(2,'Riya',1),
(3,'Rahul',1),
(4,'Kiran',2),
(5,'Anu',2);

SELECT * FROM employee;

SELECT
    e.emp_name AS Employee,
    m.emp_name AS Manager
FROM employee e
LEFT JOIN employee m
ON e.manager_id = m.emp_id;