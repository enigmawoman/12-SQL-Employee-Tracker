const initialiseDatabase = require('./initialiseDatabase');

class staffDatabase extends initialiseDatabase {
    constructor (data) {
        super (data);
    }

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

    showRoles()  {

        return new Promise((resolve, reject) => {
            this.db.query(`SELECT role.id, role.title, role.salary AS salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id`, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        })
    }

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

    update_an_Employee(employee) {

        return new Promise((resolve, reject) => {
            this.db.query(`UPDATE employee SET role_id=? WHERE id=?`, [employee.role_id, employee.employee_id], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results)
            });
        });
    }
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