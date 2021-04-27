const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Rattler99!',
    database: 'emp_trackerDB'
})

connection.connect((err) => {
    if (err) throw err;
    // run the mainMenu function after the connection is made to prompt the user
    mainMenu();
});

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: ['Add department',
                'Add role',
                'Add employee',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
                'Finished']
        }])
        .then(answers => {
            switch (answers.option) {
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'View departments':
                    viewDepartments();
                    break;
                case 'View roles':
                    viewRoles();
                    break;
                case 'View employees':
                    viewEmployees();
                    break;
                case 'Update employee roles':
                    updateEmployee();
                    break;
                default:
                    quit();
            }
        })
}


function addDepartment() {
    inquirer.prompt([
        {
        type: 'input',
        message: 'What is the name of the department you would like to add?',
            name: 'new_department'    
        }
    ]).then(answers => {
        connection.query("INSERT INTO department SET ?",
        {
           name: answers.new_department
         })
         mainMenu();
    })
};

function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'new_role',
                type: 'input',
                message: ' What is the title of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: ' What is the salary of this position?'
            },
            {
                name: 'deptChoice',
                type: 'list',
                choices: function () {
                    const deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(answers=> {
            let department_id;
            for (let i = 0; i < res.length; i++) {
                if (res[i].name == answers.deptChoice) {
                    department_id = res[i].id;
                }
            }
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answers.new_role,
                    salary: answers.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.table('All Roles:', res);
                    mainMenu();
                })
        })
    })
}

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "Employee's first name:"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "Employee's last name:"
            },
            {
                name: 'manager_id',
                type: 'input',
                messaage: "Employee's manger's id?"
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    const roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
                message: "Enter the employee's role"
            }
        ]).then(answers=> {
            let role_id;
            for (let i = 0; i < res.length; i++) {
                if (res[i].title == answers.role) {
                    role_id = res[i].id;
                }
            }
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    manager_id: answers.manager_id,
                    role_id: role_id
                },
                function (err) {
                    if (err) throw err;
                    mainMenu();
                })
        })
    })
}

    function viewEmployees() {
        const query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res.length + "employes found!");
                console.table('All Employees:', res);
                mainMenu();
            })
    }

    function viewDepartments() {
        const query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table('All Departments:', res);
            mainMenu();
        })
    }

    function viewRoles() {
        const query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table('All roles:', res);
            mainMenu();
        })
    }
    
    
// add update function