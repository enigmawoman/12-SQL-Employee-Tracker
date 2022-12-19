-- // this is for initialising the database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- use the database..
USE employee_db;

-- create the table
CREATE TABLE department (
  -- auto increment the ID and use as the primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    -- auto increment the ID and use as the primary key
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  -- links to the department table
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    -- auto increment the ID and use as the primary key
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    -- links to the role table
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);
