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
const menu = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View all employees',
                value: 'viewEmployees'
            },
            {
                name: 'View all roles',
                value: 'viewRoles'
            },
            {
                name: 'Add role',
                value: 'addRole'
            },
            {
                name: 'View all departments',
                value: 'viewDepartments'
            },
            {
                name: 'Add departments',
                value: 'addDepartment'
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
        .prompt(menu)
        .then(async (response) => {
            let choice = response.choice;
            //console.log(response)
            //await init();
            switch (choice) {
                case "viewEmployees":
                    break
                case "viewDepartments":
                    viewDepartments()
                    break
                
            }
        })
    }
init()