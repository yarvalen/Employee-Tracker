USE tracker;
INSERT INTO department
    (name)
VALUES ("Deli"),
    ("Produce"),
    ("Bakery"),
    ("Warehouse"),
    ("Customer Service");



INSERT INTO role
    (title,salary,department_id)
    VALUES ("Manager"75000,5),
    ("Cashier",50000,2),
    ("Team Leader",70000,3)
    ("Security",60000,4)
    ("Butcher",40000,1);


INSERT INTO employee
    (first_name,last_name,role_id,manager_id)
    VALUES ("John" "Doe", 1,1),
    ("Peter","Smith",2,3)
    ("James","Moore",4,2)
    ("Jeff","Taylor",3,5)
    ("Scott","Watson",5,4);

