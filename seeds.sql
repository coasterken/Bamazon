

INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Superclean Laundry Detergent',
'Cleaning Supplies',
9.99,
1500);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('All White Bleach',
'Cleaning Supplies',
1.50,
300);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Superwhite Toothpast',
'Health and Beauty',
4.50,
400);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Smell Good Deodorant',
'Health and Beauty',
5.99,
250);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Ballpark Peanuts',
'Snacks',
1.25,
700);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Big Crunch Chips',
'Snacks',
2.00,
120);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Men''s Polo Shirt',
'Clothing-Men',
25.99,
40);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Raw Selvedge Jeans',
'Clothing-Men',
80.00,
30);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Old Gringo Boots-Kicking',
'Shoes-Men',
450.00,
75);


INSERT INTO `bamazon`.`products`
(
`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Old Gringo Boots-All Red',
'Shoes-Men',
650.00,
55);

update products
set product_sales = 0.00
where product_sales is null;

select * from products;

SELECT d.department_id AS 'Department ID', 
        d.department_name AS 'Department Name', 
        concat('$', format(d.over_head_costs, 2)) AS 'Over Head Costs',
        concat('$', format(sum(p.product_sales), 2)) AS 'Product Sales', 
        concat('$', format(sum(p.product_sales) - d.over_head_costs, 2)) AS 'Total Profit'         
        FROM departments d LEFT JOIN products p
        ON d.department_name = p.department_name
        GROUP BY d.department_id;







