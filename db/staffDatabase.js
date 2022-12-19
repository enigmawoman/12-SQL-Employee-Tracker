const initialiseDatabase = require('./initialiseDatabase');

// new class extends the initalise database class - takes the login info from the base class and adds on the functions below for the database quiries
class staffDatabase extends initialiseDatabase {
    constructor (data) {
        super (data);
    }

    // this function selects the data for the department table
    showDepartments() {

        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * from department`, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        })
    }
    // this function selects the data for the role table and uses an inner join as there is a dependancy on the department table 
    showRoles()  {

        return new Promise((resolve, reject) => {
            // using aliases as well for presenting the data to the user
            this.db.query(`SELECT role.id, role.title, role.salary AS salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id`, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        })
    }
    // this function selects the data for the employee table and uses 2 inner joins and a left join as there is a dependancy on both the department and role table 
    showEmployees() {

        return new Promise((resolve, reject) => {
            this.db.query(`SELECT
                employee.id,
                CONCAT (employee.first_name, ' ', employee.last_name) AS staff_name,
                role.title AS job_title,
                role.salary AS salary,
                department.name AS department_name,
                IF(CONCAT(manager.first_name, ' ', manager.last_name) IS NULL, '', CONCAT(manager.first_name, ' ', manager.last_name)) AS manager_name
    
                FROM employee
                    INNER JOIN role ON employee.role_id = role.id
                    INNER JOIN department ON role.department_id = department.id
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`

            , (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        })
    }
// this function inserts a department into the database
    add_a_Department(department) {

        const departmentData = {name: department.department_name}

        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO department SET ?`, departmentData, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`The department, ${department.department_name}, has been added to the staff database`);
            });
        });
    }
// this function inserts a role into the database
    add_a_Role(role) {

        const roleData = {
            title: role.title,
            salary: role.salary,
            department_id: role.department_id
        };

        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO role SET ?`, roleData, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`The staff role, ${role.title}, has been added to the staff database`);
            });
        });
    }
// this function inserts an employee into the database

    add_an_Employee(employee) {

        const employeeData = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        };

        return new Promise((resolve, reject) => {
            this.db.query(`INSERT INTO employee SET ?`, employeeData, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(`The staff member, ${employee.first_name} ${employee.last_name}, has been added to the staff database`);
            });
        });
    }
// updates an employee
    update_an_Employee(employee) {

        return new Promise((resolve, reject) => {
            // updating on the employee where the id matches
            this.db.query(`UPDATE employee SET role_id=? WHERE id=?`, [employee.role_id, employee.employee_id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results)
            });
        });
    }
    //updates an employees manager
    update_Employee_Manager(employee) {

        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE employee SET manager_id=? WHERE id=?`, [employee.role_id, employee.manager_id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results)
            });
        });
    }
}


module.exports = staffDatabase;