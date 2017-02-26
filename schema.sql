CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	_id 			INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_name 	VARCHAR(50) NOT NULL,
    department_name VARCHAR(100),
    price 			DECIMAL(10,4),
    stock_quantity 	INT(10)
);