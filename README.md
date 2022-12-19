# 12 SQL: | Employee Tracker Database

Build of a CLI database that utilises Node.js, Inquirer, and MySQL.

---

**Table of Contents:**

* [Description](#description)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Testing](#testing)
* [Using the code](#using-the-code)
* [The Team Profile Generator](#the-team-profile-generator)
    * [Video Demonstration](#video-demonstration)
    * [Screenshot of the Profile Generator](#screenshot-of-the-profile-generator)
* [Usage](#usage)
* [License](#license) 
* [Questions](#questions)

---

## Description

Creation of an easy to view and interactive CLI based database. This database will track the information for the staff of a secondary school, using Node.js, Inquirer and mySQL applications.


## User Story

* AS A business owner
* I WANT to be able to view and manage the departments, roles, and employees in my company
* SO THAT I can organize and plan my business


## Acceptance Criteria


* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


The main challenge i faced, was getting used to using the mySQL queries parameters and writing the commands in the correct order, also the JOIN functionality for joining tables in different ways. However, after practising and doing some online research, I am more confident in using the expressions correcly, but i will do more research and practice on this.

I also had the opportunity to practise and refine my current JavaScript skills.

## Installation

Start by downloading the code from the repository, then load in VS code, open a terminal and make sure you are in the project folder.
Initialise the code by typing into the terminal:
```bash
npm init -y
npm i inquirer@8.2.4
npm install mysql2
npm install console.table
```

Then add *"start": "node index.js"* to the package.json file uder *scripts*

## Using the code

To initialise the database you will need to run the following commands in the terminal to login into mySQL and initialise the database:
```bash
mysql -u -root -p
SOURCE db/schema.sql
SOURCE db/seeds.sql
quit;
```

To get the employee tracker database code to run you will need to enter into the terminal:
```bash
node index.js
```
 and you will be prompted with a series of options and questions, the answers to these questions will update the database and allow you to view the current data within the database. 

Once you have finished with the database, be sure to run *(ctrl+C)* or *(^C)* to close down the session.

I have fully commented the codefiles, to explain the flow and logic of the code, so that others can work on this and expand on it too.


## Employee Tracker Database

### Video demonstration.


<a href="https://drive.google.com/file/d/1rpxGvoVnJx_d3uiI7cAGyBWBkQAyeVD3/view"><b>Link to FULL VERSION video Demonstration</b></a>

Shortened version embedded below:


https://user-images.githubusercontent.com/112570078/205699422-9de47e9c-e5fb-4a9f-8b3d-bffff4329eda.mp4


## Usage

Please feel free to use this code for setting up your own Employee Tracker Database, if you have any questions or suggestions, please let me know using the links in the [questions](#questions) section of this README.

## License

NA

## Questions

If you have any questions, reach out at [@enigmawoman](https://github.com/enigmawoman)</br>

