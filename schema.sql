-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

-- Make it so all of the following code will affect favorite_db --
use bamazon;

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE products(
  item_id integer(10) not null AUTO_INCREMENT,
  product_name VARCHAR(100) not null,
  department_name VARCHAR(50) not null,
  price decimal(10,2),
  stock_quantity integer(10),
  primary key(item_id)
);

select * from products;