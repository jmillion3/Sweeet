CREATE TABLE users ( 
user_id SERIAL PRIMARY KEY, 
first VARCHAR(50), 
last VARCHAR(50), 
email VARCHAR(100) NOT NULL, 
username VARCHAR(50) NOT NULL, 
password VARCHAR(3000) 
); 

CREATE TABLE products ( 
p_id SERIAL PRIMARY KEY, 
p_name VARCHAR(50), 
p_image VARCHAR(3000), 
p_details VARCHAR(500), 
p_cost INTEGER 
); 

CREATE TABLE cart ( 
cart_id SERIAL PRIMARY KEY, 
user_id INTEGER REFERENCES users(user_id), 
p_id INTEGER REFERENCES products(p_id) 
);















