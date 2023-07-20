const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

//Array questions for user
const options = [
  {
    type: "list",
    name: "choice",
    message: "What are you looking for?",
    choices: [
      {
        name: "View all employees",
        value: "viewEmployees",
      },
      {
        name: "View all departments",
        value: "viewDepartments",
      },
      {
        name: "View all roles",
        value: "viewRoles",
      },
      {
        name: "Add employee",
        value: "addEmployee",
      },
      {
        name: "Add departments",
        value: "addDepartment",
      },
      {
        name: "Add role",
        value: "addRole",
      },
      {
        name: "Leave",
        value: "leave",
      },
    ],
  },
];

function viewEmployees() {
  const viewEmployee = `SELECT employees.id, employees.first_name, employees.last_name,role.title,department.name,role.salary FROM employees LEFT JOIN role on employees.role_id=role.id LEFT JOIN department on role.department_id=department.id;`;
  db.query(viewEmployee, (err, data) => {
    if (err) {
      throw err;
    }
    console.table(data);
  });
}
function viewDepartments() {
  console.log("viewDepartments");
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      throw err;
    }
    console.table(data);
  });
}
function viewRoles() {
  db.query(`SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`, (err, data) => {
    if (err) {
      console.error(err);
    }
    console.table(data);
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of new employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of new employee?",
      },
    ])
    .then((data) => {
      var first_name = data.firstName;
      var last_name = data.lastName;
      db.query("SELECT * FROM role", (err, data) => {
        const roles = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the role id?",
              choices: roles,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Select the manager_id",
              choices: [1, 2, 3, 4, 5],
            },
          ])
          .then((data) => {
            console.log(data);
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)VALUES ("${first_name}","${last_name}","${data.role}", "${data.manager_id}")`);
          });
      });
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "What is the department name?",
      },
    ])

    .then((data) => {
      db.query(`INSERT INTO department (name) VALUES("${data.newDept}");`, function (err) {
        // (err, data) => {
        if (err) throw err;
      });
      viewDepartments();
    });
}

function addRole() {
  // TODO: Select all department IDs from the database
  db.query(`SELECT id FROM department;`, (err, data) => {
    if (err) {
      throw err;
    }

    const departmentIds = data.map((department) => department.id);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the new role title?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department_id?",
          name: "department_id",
          choices: departmentIds,
        },
      ])
      .then((data) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES("${data.title}","${data.salary}","${data.department_id}");`, function (err) {
          if (err) throw err;
        });
      });
  });
}

function init() {
  inquirer.prompt(options).then((response) => {
    console.log(response);
    switch (response.choice) {
      case "viewEmployees":
        viewEmployees();
        break;
      case "viewDepartments":
        viewDepartments();
        break;
      case "viewRoles":
        viewRoles();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addRole();
        break;
    }
  });
}
init();
