--departments--

INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Engineering'),
('Finance');

--roles, salary and id--
INSERT INTO role (title,salary, department-id)
VALUES
('Lead Software Engineer',135000,1),
('Software Engineer',95000,1),
('Sales Lead',110000, 2),
('Sales Consultant', 75000, 2),
("Head of Legal", 210000, 3),
('Lawyer',147000, 3),
('Head of Finance', 195000, 4),
('Accountant', 135000, 4);

--employee names, roles, dept id--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Chaoxiang', 'Liu', 1, NULL),
('Qiao','Zhou', 2, 1),
('Reza','Hasan',3, NULL),
('Francesca', 'Ricci', 4, 3),
('Annabelle', 'Sykes', 5, NULL),
('Rohan', 'Patel', 6, 5),
('Peter', 'Williams', 7, NUll),
('Hamish', 'McGregor', 8, 7);
