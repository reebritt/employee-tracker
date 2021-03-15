const mysql = require('mysql');
const inquirer = require('inquirer');
const cTABLE = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port 3301,
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
            choice: ['Add department',
                'Add role',
                'Add employee',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
                'Finished']
        }
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
                        viewDeparment();
                    case 'View roles':
                        viewRoles();
                        break;
                    case 'View employees',
                        viewEmployees();
                        break;
                    case 'Update employee roles':
                        updateEmployee();
                        break;
                    default:
                        quit();
                }
            });
    ])
}


