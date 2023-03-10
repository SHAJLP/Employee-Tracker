// ICreating dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');
const { response } = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection({
     
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
},
console.log(`Connected to the employee_db database.`)
);

db.connect((err) =>{
    if(err) throw err;
    console.log(`Connected as id ${db.threadId} \n`);
    startApp();
});

startApp = () => {
    inquirer.prompt([
        {
            //Begin Command line
            name:'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to the employee management program. What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View all employees by manager', 'Add a department', 'Add a role', 'Add an employee', 'Update employee\'s role', 'Update employee\'s manager', 'Remove a department', 'Remove a role', 'Remove an employee', 'View total salary of department', 'Exit program']
        }

    ]).then((response) => {
        switch (response.initialInquiry){
            case 'View all departments':
                viewAllDepartments();
                break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all employees by manager':
                    viewAllEmployeesByManager();
                break;
                case 'Add a department':
                    addADepartment();
                break;
                case 'Add a role':
                    addARole();
                break;
                case 'Add an employee':
                    addAnEmployee();
                break;
                case 'Update employee\'s role':
                    updateEmployeeRole();
                break;
                case 'Update employee\'s manager':
                    updateEmployeesManager();
                break;
                case 'Remove a department':
                    removeADepartment();
                break;
                case 'Remove a role':
                    removeARole();
                break;
                case 'Remove an employee':
                    removeAnEmployee();
                break;
                case 'View total salary of department':
                    viewDepartmentSalary();
                break;
                case 'Exit program':
                    db.end();
                    console.log('\n You have exited the employee management program. Thanks for using! \n');
                    return;
                default:
                    break;
            
        }
    })
}
//Views all departments in table
 viewAllDepartments = () => {
    db.query(`SELECT * FROM department ORDER BY id ASC;`, (err,res) => {
        if(err) throw err;
        console.table('\n', res, '\n');
        startApp();

    })
 };
 //Views all roles in table
 viewAllRoles = () => {
    db.query(`SELECT e role.role_id, role.title, role.salary, department.name, department.id FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};
//Views all employees
viewAllEmployees = () => {
    db.query(`SELECT id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.id JOIN role ON e.role_id = role.role_id JOIN department ON department.id = role.department_id ORDER BY e.id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};
//Views all managers
viewAllEmployeesByManager = () => {
    db.query(`SELECT id, first_name, last_name FROM employee ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        let managers = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
        inquirer.prompt([
            {
            name: 'manager',
            type: 'rawlist',
            message: 'Which manager would you like to see the employee\'s of?',
            choices: managers   
            },
        ]).then((response) => {
            db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.id JOIN role ON e.id = role.id JOIN department ON department.id = role.department_id WHERE e.manager_id = ${response.manager} ORDER BY e.id ASC`, 
            (err, res) => {
                if (err) throw err;
                console.table('\n', res, '\n');
                startApp();
            })
        })
    })
}
//Adding a department
addADepartment = () => {
    inquirer.prompt([
        {
        name: 'newDept',
        type: 'input',
        message: 'What is the name of the department you want to add?'   
        }
    ]).then((response) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.newDept} successfully added to database! \n`);
            startApp();
        })
    })
};
//Adding a role to a department
addARole = () => {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role you want to add?'   
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role you want to add?'   
            },
            {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department do you want to add the new role to?',
            choices: departments
            },
        ]).then((response) => {
            db.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.title} successfully added to database! \n`);
                startApp();
            })
        })
    })
};
//Adding an employee to the department

addAnEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the new employee\'s first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the new employee\'s last name?'
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'What is the new employee\'s title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is the new employee\'s manager?',
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                    startApp();
                })
                // db.query(`INSERT INTO role SET ?`, 
                // {
                //     depart_id: response.role,
                // }, 
                // (err, res) => {
                //     if (err) throw err;
                //     console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                //     startApp();
                // })
            })
        })
    })
};
//Updating employee role 
updateEmployeeRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should the employee\'s new role be?',
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's role in the database! \n`);
                    startApp();
                })
            })
        })
    })
}
//Updating employees manager
updateEmployeesManager = () => {
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
        inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                message: 'Which employee would you like to update the manager for?',
                choices: employees
            },
            {
                name: 'newManager',
                type: 'rawlist',
                message: 'Who should the employee\'s new manager be?',
                choices: employees
            },
        ]).then((response) => {
            db.query(`UPDATE employee SET ? WHERE ?`, 
            [
                {
                    manager_id: response.newManager,
                },
                {
                    id: response.employee,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n Successfully updated employee's manager in the database! \n`);
                startApp();
            })
        })
    })
};
//Removing department/s
removeADepartment = () => {
    db.query(`SELECT * FROM department ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department would you like to remove?',
            choices: departments
            },
        ]).then((response) => {
            db.query(`DELETE FROM department WHERE ?`, 
            [
                {
                    dept_id: response.deptName,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n Successfully removed the department from the database! \n`);
                startApp();
            })
        })
    })
}
//Removing a role from the database
removeARole = () => {
    db.query(`SELECT * FROM role ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'rawlist',
            message: 'Which role would you like to remove?',
            choices: roles
            },
        ]).then((response) => {
            db.query(`DELETE FROM role WHERE ?`, 
            [
                {
                    role_id: response.title,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n Successfully removed the role from the database! \n`);
                startApp();
            })
        })
    })
}
//Removing an employee from database
removeAnEmployee = () => {
    db.query(`SELECT * FROM employee ORDER BY id ASC;`, (err, res) => {
        if (err) throw err;
        let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
        inquirer.prompt([
            {
                name: 'employee',
                type: 'rawlist',
                message: 'Which employee would you like to remove?',
                choices: employees
            },
        ]).then((response) => {
            db.query(`DELETE FROM employee WHERE ?`, 
            [
                {
                    id: response.employee,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n Successfully removed the employee from the database! \n`);
                startApp();
            })
        })
    })
}
//Adding salary 
viewDepartmentSalary = () => {
    db.query(`SELECT * FROM department ORDER BY dept_id ASC;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department would you like to view the total salaries of?',
            choices: departments
            },
        ]).then((response) => {
            db.query(`SELECT department_id, SUM(role.salary) AS total_salary FROM role WHERE ?`, 
            [
                {
                    department_id: response.deptName,
                },
            ], 
            (err, res) => {
                if (err) throw err;
                console.log(`\n The total utilized salary budget of the ${response.deptName} department is $ \n`);
                console.table('\n', res, '\n');
                startApp();
            })
        })
    })
}