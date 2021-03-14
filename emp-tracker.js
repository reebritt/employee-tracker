const mysql = require('mysql');
const inquirer = require('inquirer');
const cTABLE = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port 3301,
    user: 'root',
    password: 'Rattler99!',
   database:'emp_trackerDB'
})


connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  