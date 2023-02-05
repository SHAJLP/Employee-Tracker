DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

<--creating department tables-->

CREATE TABLE department {
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
};

<--creating role table-->

CREATE TABLE role {
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) 
};

<--creating employee table-->

CREATE TABLE employee {
    id INT NOT NULL AUTO INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id) 
};