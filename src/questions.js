// the questions that will be presented to the user when the functions run
const MenuQuestions =[
    {   type: "list",
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
            { 
                name: "view all departments",
                value: 'view_all_departments',
            },
            {
                name: "view all roles",
                value: 'view_all_roles',
            },
            {
                name: "view all employees",
                value:'view_all_employees',
            },
            {
                name: "add a department",
                value: 'add_a_department',
            },
            {
                name: "add a role",
                value: 'add_a_role',
            },
            {
                name: "add an employee",
                value: 'add_an_employee',
            },
            {
                name: "update an employee role",
                value: 'update_an_employee_role',
            },
        ]},
];

const AddDepartmentQues =[
    {
        type: "input",
        name: "department_name",
        message: "Please enter the department name..",
    },
];

const AddRoleQues =[
    {
        type: "input",
        name: "title",
        message: "Please enter the title of the role..",
    },
    {
        type: "number",
        name: "salary",
        message: "Please enter the salary for the role..",
    },
    {
        type: "list",
        name: "department_id",
        message: "Please choose the department for the role..",
        choices: [
        ],
    },
];

const AddEmployeeQues =[
    {
        type: "input",
        name: "first_name",
        message: "Please enter the Employee's first name..",
    },
    {
        type: "input",
        name: "last_name",
        message: "Please enter the Employee's last name..",
    },
    {
        type: "input",
        name: "role_id",
        message: "Please enter the role for the employee..",
    },
    {
        type: "list",
        name: "manager_id",
        message: "Which manager will the employee report too..",
        choices: [
        ],
    },
];
const UpdateEmployeeQues =[
    {
        type: "list",
        name: "employee_id",
        message: "Please choose an employee to update..",
        choices: [
        ],
    },
    {
        type: "list",
        name: "role_id",
        message: "Please choose the new role for the employee..",
        choices: [
        ],
    },
];
// exporting the questions
module.exports = {MenuQuestions, AddDepartmentQues, AddRoleQues, AddEmployeeQues, UpdateEmployeeQues};