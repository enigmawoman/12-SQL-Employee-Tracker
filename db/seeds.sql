INSERT INTO department (id, name)
VALUES (1, "Teaching"),
       (2, "Support Staff"),
       (3, "Management"),
       (4, "Administration"),
       (5, "Facilities");


INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Teacher", 30000, 1),
    (2, "Secretary", 25000, 4),
    (3, "Care Taker", 25000, 5),
    (4, "Head Teacher", 50000, 3),
    (5, "Science Technician", 30000, 2),
    (6, "Cleaner", 19000, 5),
    (7, "Lunchtime Supervisor", 2),
    (8, "Teaching Assistant", 23000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Sandra", "Dobbs", 3, NULL),
    (2, "Kevin", "Foalks", 6, 3),
    (3, "Amanda", "Stone", 5, 1),
    (4, "Carly", "Green", 1, 4),
    (5, "Anthony", "Westerly", 4, NULL),
    (6, "Pamela", "Smith", 7, 3),
    (7, "Anne", "Monderly", 8, 1),
    (8, "Paul", "Woodley", 2, 4),
    (9, "Amanda", "Booth", 1, 4),
    (10,"Peter", "Faith", 1,4);

