// requiring the inquirer module in order to run the questions in the terminal
const inquirer = require('inquirer');

// reuiure the questions.js file
const  {MenuQuestions, AddDepartmentQues, AddRoleQues, AddEmployeeQues, UpdateEmployeeQues} = require('./questions');

// const Managers = [];
// const Interns = [];
// const Engineers = [];

// this function is called from the index.js file and runs questions required to populate the html team page
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
        }
    })
};
// the follwoing functions propmt the questions relevent to each employee and then takes the responses and adds them to the relevant array for export

const runManagerQuestions = () => {
    inquirer
    .prompt(Questions.ManagerQues)
    .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        Managers.push(manager);
        console.log(Managers);
        runStartQuestions();
    })
};

const runEngineerQuestions = () => {
    inquirer
    .prompt(Questions.EngineerQues)
    .then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        Engineers.push(engineer);
        console.log(Engineers);
        runStartQuestions();
    })
};

const runInternQuestions = () => {
    inquirer
    .prompt(Questions.InternQues)
    .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        Interns.push(intern);
        console.log(Interns);
        runStartQuestions();
    })
}
// exports the function to be able to call it from the index.js file
module.exports = runMenuQuestions;