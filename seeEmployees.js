const connection = require('../db/connections');

function seeEmployees(){
    const db = connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.;"
      );
      db.then(([rows]) => {
        let employees = rows;
        console.log(rows);
      });
    }
    const employees = seeEmployees();
    console.log(employees);

module.exports = seeEmployees