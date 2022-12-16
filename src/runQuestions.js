// requiring the inquirer module in order to run the questions in the terminal
const inquirer = require('inquirer');
const staffDatabase = require('../db/staffDatabase')
// reuiure the questions.js file
const  {MenuQuestions, AddDepartmentQues, AddRoleQues, AddEmployeeQues, UpdateEmployeeQues, UpdateEmployeeManagerQues} = require('./questions');


const db = new staffDatabase(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'  
    }
)
// const Managers = [];
// const Interns = [];
// const Engineers = [];

db.connect();

// this function is called from the index.js file and runs questions required t
const runMenuQuestions = () => {

    // inquirer prompt
    inquirer
    // asking the initial questions to determine which type of emplpyee you would like to add
    .prompt(MenuQuestions)
    .then((answer) => {
        // using a switch statement to determine which function needs to run based on the user input
        switch(answer.selection) {
            case 'view_all_departments':

                viewDepartments()
                break;

            case 'view_all_roles':

                viewRoles()
                break;

            case 'view_all_employees':

                viewEmployees()
                break;

            case 'add_a_department':
                
                addDepartment()
                break;

            case 'add_a_role':
                
                addRole()
                break;

            case 'add_an_employee':
            
                addEmployee()
                break;

            case 'update_an_employee_role':
        
                updateEmployee()
                break;

            case 'update_an_employee_manager':
    
            updateEmployeeManager()
            break;

            case 'delete_an_employee':

            deleteAnEmployee()
            break;
        }
    })
};
// the follwoing functions propmt the questions relevent to each employee and then takes the responses and adds them to the relevant array for export

const viewDepartments = () => {
    
    db.showDepartments()
    .then((results) => {
        
        console.table(results);

        runMenuQuestions();
    })
};

const viewRoles = () => {
   
    db.showRoles()
    .then((results) => {
        
        console.table(results);

        runMenuQuestions();
    })
};

const viewEmployees = () => {
   
    db.showEmployees()
    .then((results) => {
        
        console.table(results);

        runMenuQuestions();
    })
};

const addDepartment = () => {

    inquirer

    .prompt(AddDepartmentQues)
    .then((answer) => {

        db.add_a_Department(answer)
        .then((results) => {

            console.log('\n', results, '\n');

            runMenuQuestions();
        })
    })
};

const addRole = () => {

    db.showDepartments()
    .then((results) => {
        
        const deptQues = AddRoleQues[2];
        results.forEach((department) => {
            
            deptQues.choices.push(
                {
                    name: department.name,
                    value: department.id,
                }
            )
        });

        inquirer

        .prompt(AddRoleQues)
        .then((answer) => {

            db.add_a_Role(answer)
            .then((results) => {

                console.log('\n', results, '\n');

                runMenuQuestions();
            });
        })
    })
};

const addEmployee = () => {

    db.showRoles()
    .then((results) => {

        const roleQues = AddEmployeeQues[2];
        results.forEach((role) => {

            const roleSummary = `${role.title} (${role.department_name}: ${role.salary})`;
            roleQues.choices.push(
                { 
                    name: roleSummary,
                    value: role.id
                });
        });

        db.showEmployees()
        .then((results) => {

            const managerQues = AddEmployeeQues[3];
            results.forEach((employee) => {
                managerQues.choices.push(
                    {
                        name: employee.staff_name,
                        value: employee.id
                    }
                )
            });

            managerQues.choices.push({
                name: 'None',
                value: null
            });

            inquirer

            .prompt(AddEmployeeQues)
            .then((answer) => {
                db.add_an_Employee(answer)
                .then((results) => {
                    console.log('\n', results, '\n');

                    runMenuQuestions();
                });
            })
        });
    });
    
};

const updateEmployee = (results) => {

    db.showEmployees()
    .then((results) => {

        const empQues = UpdateEmployeeQues[0];
        results.forEach((employee) => {
            empQues.choices.push(
                {
                    name: employee.staff_name,
                    value: employee.id
                }
            );   
        });

        db.showRoles()
        .then((results) => {
            const roleQues = UpdateEmployeeQues[1];
            results.forEach((role) => {
                roleQues.choices.push(
                    {
                        name: role.title,
                        value: role.id
                    }
                );
            });

            inquirer

            .prompt(UpdateEmployeeQues)
            .then((answer) => {
                db.update_an_Employee(answer)
                .then((results) => {
                    console.log('\n', results, '\n');
                    
                    runMenuQuestions();
                });
            });
        });
    });

  

};
const updateEmployeeManager = (results) => {

    db.showEmployees()
    .then((results) => {

        const empQues = UpdateEmployeeManagerQues[0];
        results.forEach((employee) => {
            empQues.choices.push(
                {
                    name: employee.staff_name,
                    value: employee.id
                }
            );   
        });

        db.showEmployees()
        .then((results) => {

            const managerQues = UpdateEmployeeManagerQues[1];
            results.forEach((employee) => {
                managerQues.choices.push(
                    {
                        name: employee.staff_name,
                        value: employee.id
                    }
                )
            });

            managerQues.choices.push({
                name: 'None',
                value: null
            });

            inquirer

            .prompt(UpdateEmployeeManagerQues)
            .then((answer) => {
                db.update_Employee_Manager(answer)
                .then((results) => {
                    console.log('\n', results, '\n');
                    
                    runMenuQuestions();
                });
            });
        });
    });
};

// exports the function to be able to call it from the index.js file
module.exports = runMenuQuestions;