const inquirer = require('inquirer')
const db = require('./db/connection');
require ("console.table")
// //employee
// const seeEmployees = require('.seeEmployees')
// //roles
// const roles = require('.roles')
// //department
// const departments = require('.departments')

//Array of questions for user input
const options = [
    {
        type: 'list',
        name: 'choice',
        message: 'What are you looking for?',
        choices: [
            {
                name: 'View all employees',
                value: 'viewEmployees'
            },
            {
                name: 'View all departments',
                value: 'viewDepartments'
            },
            {
                name: 'View all roles',
                value: 'viewRoles'
            },
            {
                name: 'Add employee',
                value: 'addEmployee'
            },
            {
                name: 'Add departments',
                value: 'addDepartment'
            },
            {
                name: 'Add role',
                value: 'addRole'
            },
            {
                name: 'Quit',
                value: 'quit'
            }
        ]
    }
]
function viewDepartments(){
    console.log('viewDepartments')
    db.query (`SELECT * FROM department`,(err, data)=>{
        if (err) {
            throw err
        }
        console.table(data)
    })

}
//function to initialize prompt
function init() {
    inquirer
        .prompt(options)
        .then((response) => {
            
            switch (response.action) {
                case "viewEmployees":
                    viewEmployees()
                    break
                case "viewDepartments":
                    viewDepartments()
                    break
                case "viewRoles":
                    viewRoles()
                    break
                case "addEmployee":
                    addEmployee()
                    break
                case "addDepartment":
                    addDepartment()
                    break
                case "addRole":
                    addRole()
                    break
            }
        })
    }
init()