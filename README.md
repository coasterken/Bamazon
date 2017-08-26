# Bamazon

Bamazon is a CLI based shopping app that offers options for customer shopping, product managers, and product supervisors.  

### node.js files
* bamazonCustomer.js - customer shopping
* bamazonManager.js - product management
* bamazonSupervisor.js - product supervision
  
### npm packages
* npm mysql:  https://www.npmjs.com/package/mysql
* npm inquirer:  https://www.npmjs.com/package/inquirer
* npm console.table: https://www.npmjs.com/package/console.table

### mysql database
#### database name: bamazon
#### tables
* departments - department data-managed by supervisors
 
  | FIELD |TYPE| NULL | KEY | DEFAULT | EXTRA |
  | --- | --- | --- | --- | --- | --- |
  | `department_id`  	| int(10)	      | NO	  | PRI|		| `auto_increment`|
  | `department_name`	| varchar(100)	  |NO 	|		|   | |
  | `over_head_costs`	| decimal(10,2)	| YES  |		|  	| |

* products - product data-managed by product managers and updated when customers shop

  | FIELD             |TYPE           | NULL | KEY | DEFAULT | EXTRA |
  | ---               | ---           | ---  | --- | ---     | ---   |
  |	`item_id`     	  |	int(10)	      |	NO	 | PRI | NULL	   |	`auto_increment`	|
  |	`product_name`	  |	varchar(100)	|	NO	 |		 | NULL	   |		|
  |	`department_name`	|	varchar(50)	  |	NO	 |		 | NULL 	 |		|
  |	 price	          |	decimal(10,2)	|	YES	 |		 | NULL	   |		|
  |	`stock_quantity`	|	int(10)	      |	YES  |		 | NULL	   |		|
  |	`product_sales` 	|	decimal(10,2)	|	YES	 |		 |	0      |		|

* schema: https://github.com/coasterken/Bamazon/blob/master/schema.sql
* seed: https://github.com/coasterken/Bamazon/blob/master/seeds.sql

### Workflow

#### Supervisor
* Functions:
  * View product sales by department
  * Add new departments

#### Product Manager
* Functions
  * View products for sale
  * View low inventory
  * Add to inventory
  * Add new product
  
#### Customer Shopping
* Functions
  * Shop for products





