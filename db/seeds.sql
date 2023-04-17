-- Insert multiple department names --
INSERT INTO department (dept_name)
VALUES ('Sales'),
       ('HR'),
       ('Programming'),
       ('IT'),
       ('Executive');

-- adding the multiple values to the table role
INSERT INTO role (title,salary,depart_id)
VALUES ('Account Executive', 100000, 1),
       ('Sr. Account Executive', 150000, 1),
       ('Sales Director', 200000, 1),
       ('HR Coordinator', 75000, 2),
       ('HR Generalist', 85000, 2),
       ('HR Director', 100000, 2),
       ('Jr. Developer', 85000, 3),
       ('Sr. Developer', 125000, 3),
       ('Programming Director', 225000, 3),
       ('IT Project Manager', 850000, 4),
       ('IT Project Director', 100000, 4),
       ('Chief Executive Officer', 300000, 5),
       ('Chief Operating Officer', 275000, 5),
       ('Chief Financial Officer', 275000, 5);

-- adding the multiple values to the table employee
INSERT INTO employee (first_name, last_name, rolee_id, manager_id)
VALUES ('Edward', 'Smith', 12, NULL),
       ('Victoria', 'Carmicheal', 13, 1),
       ('Henrietta', 'Freeman', 14, 1),
       ('Muhammed', 'Riaz', 3, 2),
       ('David', 'Xiu', 9, 2),
       ('Rohan', 'Mithu', 11, 2),
       ('Sophia', 'Altaf', 6, 2),
       ('Mousin', 'Hamza', 1, 4),
       ('Reka', 'Patel', 1, 4),
       ('Charlie', 'Hong', 2, 4),
       ('Reza', 'Khan', 4, 7),
       ('Amira', 'Hasan', 5, 7),
       ('Mina', 'Chohan', 5, 7),
       ('Arthur', 'Kingsley', 7, 5),
       ('Tabitha', 'Ramirez', 8, 5),
       ('Sue', 'Jones', 10, 6),
       ('Magnus', 'Larsen', 10, 6);