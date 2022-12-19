// requiring the npm inquirer module in order to run the questions in the terminal
const inquirer = require('inquirer');
const staffDatabase = require('../db/staffDatabase')
// require the questions.js file
const  {MenuQuestions, AddDepartmentQues, AddRoleQues, AddEmployeeQues, UpdateEmployeeQues, UpdateEmployeeManagerQues} = require('./questions');

//creating a new instance of the staffDatabase class to add in the login parameters for mySQL
const db = new staffDatabase(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'  
    }
)
//connecting to the database
db.connect();

// this function is called from the index.js file and runs questions required to view and update the database
const runMenuQuestions = () => {

    // inquirer prompt
    inquirer
    // asking the initial questions to determine which task you would like to complete
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
        }
    })
};
// the following functions propmt the database queries to run from the staffDatabase.js file

// will show you a table of the deptpartments
const viewDepartments = () => {
    
    db.showDepartments()
    .then((results) => {
        // will display the results in a table
        console.table(results);

        runMenuQuestions();
    })
};

// will show a table of the roles
const viewRoles = () => {
   
    db.showRoles()
    .then((results) => {
        
        console.table(results);

        runMenuQuestions();
    })
};

// will show a table of the employees 
const viewEmployees = () => {
   
    db.showEmployees()
    .then((results) => {
        
        console.table(results);

        runMenuQuestions();
    })
};


const addDepartment = () => {

    inquirer
// runs thr questions need to add a department to the database
    .prompt(AddDepartmentQues)
    .then((answer) => {
// all the departments inc the newly added one will be displayed in a table
        db.add_a_Department(answer)
        .then((results) => {

            console.log('\n', results, '\n');

            runMenuQuestions();
        })
    })
};


const addRole = () => {

    // all the show departments query to get the database results
    db.showDepartments()
    .then((results) => {
        // then using a forEach, pass each one of the departments into the 3rd question in add role questions and will display them as choices
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
// then run the addRole Questions
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
    // all the show roles query to get the database results

    db.showRoles()
    .then((results) => {
       
        // then using a forEach, pass each one of the roles into the 3rd question in add employee questions and will display them as choices

        const roleQues = AddEmployeeQues[2];
        results.forEach((role) => {

            const roleSummary = `${role.title} (${role.department_name}: ${role.salary})`;
            roleQues.choices.push(
                { 
                    name: roleSummary,
                    value: role.id
                });
        });
    // all the show employees query to get the database results

        db.showEmployees()
        .then((results) => {
        // then using a forEach, pass each one of the employees into the 4th question in add employee questions and will display them as choices for the managers, as managers are also employess

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
// run the add employees questions
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
    // all the show employees query to get the database results
    db.showEmployees()
    .then((results) => {
        // then using a forEach, pass each one of the employees into the 1st question in update employee questions and will display them as choices

        const empQues = UpdateEmployeeQues[0];
        results.forEach((employee) => {
            empQues.choices.push(
                {
                    name: employee.staff_name,
                    value: employee.id
                }
            );   
        });
    // all the show roles query to get the database results
    db.showRoles()
        .then((results) => {
            const roleQues = UpdateEmployeeQues[1];
        // then using a forEach, pass each one of the roles into the 2nd question in update employee questions and will display them as choices

            results.forEach((role) => {
                roleQues.choices.push(
                    {
                        name: role.title,
                        value: role.id
                    }
                );
            });

            inquirer
// runs the questions for the update employee question
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
    // all the show employees query to get the database results
    db.showEmployees()
    .then((results) => {
        // then using a forEach, pass each one of the employees into the 1st question in update employee manager questions and will display them as choices

        const empQues = UpdateEmployeeManagerQues[0];
        results.forEach((employee) => {
            empQues.choices.push(
                {
                    name: employee.staff_name,
                    value: employee.id
                }
            );   
        });
    // all the show employees query to get the database results
    db.showEmployees()
        .then((results) => {
        // then using a forEach, pass each one of the employees into the 2nd question in update employee manager questions and will display them as choices
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
// runs the questions for the update employee manager function
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