-- Drops db if it exists currently --
-- DROP DATABASE IF EXISTS bamazon;

-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

-- Make it so all of the following code will affect db --
use bamazon;

-- Creates the table within db --
CREATE TABLE products(
  item_id integer(10) not null AUTO_INCREMENT,
  product_name VARCHAR(100) not null,
  department_name VARCHAR(50) not null,
  price decimal(10,2),
  stock_quantity integer(10),
  primary key(item_id)
);
ALTER TABLE products
ADD product_sales decimal(10,2);

ALTER TABLE products
ALTER COLUMN product_sales SET DEFAULT 0.00;

select * from products;

-- -----------------------------------------------------------------------

use bamazon;
-- Creates the table within db --
CREATE TABLE departments(
  department_id integer(10) not null AUTO_INCREMENT,
  department_name VARCHAR(100) not null,
  over_head_costs decimal(10,2),
  primary key(department_id)
);

select * from departments;










