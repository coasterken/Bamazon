//require npm packages for this project

var inquirer = require('inquirer');
var mysql = require("mysql");
require('console.table');

//Global Variables
var lowInventoryCount = 5;
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});

//create the connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Dtmao#423",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showManagerFront();
});

//displays items and prompts for shopping selection
function showManagerFront() {

    console.log("-------------------------------------------------------------");
    inquirer.prompt([{
        type: 'rawlist',
        message: 'Select Bamazon product management option: ',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ],
        name: 'manageOption'
    }]).then(function (answers) {

        switch (answers.manageOption) {
            case 'View Products for Sale':
                showAllProducts();
                break;
            case 'View Low Inventory':
                showLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                console.log("Something really bad occurred!");
                break;
        }

    }); // ************* end of select all callback
} //***********End of function createStoreFront */

//displays items and prompts for shopping selection
function showAllProducts() {

    connection.query("SELECT item_id AS 'Item ID', " +
        "product_name AS 'Product', " +
        "department_name AS 'Department', " +
        "concat('$', format(price, 2)) AS 'Price', " +
        "stock_quantity AS 'Stock Quantity' " +
        "FROM products",
        function (err, res) {

            if (err) throw err;

            //loop through query results and display to the user
            console.log("---------------- Bamazon Products-------------------\n");
            console.table(res);
            goAgain();

        }); //***********End of select all query */
} // *********** end of show all products

//displays items and prompts for shopping selection
function showLowInventory() {

    connection.query("SELECT item_id AS 'Item ID', " +
        "product_name AS 'Product', " +
        "department_name AS 'Department', " +
        "concat('$', format(price, 2)) AS 'Price', " +
        "stock_quantity AS 'Stock Quantity' " +
        "FROM products where stock_quantity <= ?", [lowInventoryCount],
        function (err, res) {

            if (err) throw err;

            if (res.length === 0) {
                console.log ("No products have inventory count lower than " + lowInventoryCount);
            } else {
                console.log("------- Bamazon Low Inventory Products-Count <=" + lowInventoryCount + " -------------------\n");
                console.table(res);
            }
            goAgain();

        }); //***********End of select all query */
} // *********** end of show low inventory

//Allows manager to add to increase inventory
function addToInventory() {
    //manager selects item to adjust
    inquirer.prompt([{
            type: 'input',
            message: 'Enter the product id of the item you wish to adjust: ',
            name: 'productID',
            validate: function (value) {
                if (value) {
                    return true;
                }
                return 'Please enter a valid product id: ';
            }
        },
        {
            type: 'input',
            message: 'Please enter inventory increase amount: ',
            name: 'quantity',
            validate: function (value) {
                if (value && isNaN(value) === false) {
                    return true;
                }
                return 'Please enter a valid number: ';
            }
        }
    ]).then(function (answers) {

        var productID = parseInt(answers.productID);
        var adjustQuantity = parseInt(answers.quantity);

        var query = "UPDATE products SET stock_quantity = stock_quantity + ? where item_id = ?";
        connection.query(query, [adjustQuantity, productID], function (err, res) {
            
            if (err) throw err;

            if (res.affectedRows === 0) {
              console.log("ERROR! No updates made - verify item id/quantity and retry.");
            } else {
              console.log(res.affectedRows + " item(s) updated!");
            }
            goAgain();
        }); //end of update query        

    }); // ************* end of prompt
} //*************end of add to inventory */

function addNewProduct() {
    //manager selects item to adjust
    inquirer.prompt([
    {
        type: 'input',
        message: 'Enter the new product name: ',
        name: 'productName',
        validate: function (value) {
            if (value) {
                return true;
            }
            return 'Please enter a valid product name: ';
        }
    },
    {
        type: 'input',
        message: 'Enter the product department name: ',
        name: 'departmentName',
        validate: function (value) {
            if (value) {
                return true;
            }
            return 'Please enter a valid department name: ';
        }
    },
    {
        type: 'input',
        message: 'Please enter product price: ',
        name: 'productPrice',
        validate: function (value) {
            if (value && isNaN(value) === false) {
                return true;
            }
            return 'Please enter a valid price: ';
        }
    },
    {
        type: 'input',
        message: 'Please enter inventory quantity: ',
        name: 'quantity',
        validate: function (value) {
            if (value && isNaN(value) === false) {
                return true;
            }
            return 'Please enter a valid quantity: ';
        }
    }
    ]).then(function (answers) {

        var productName = answers.productName;
        var departmentName = answers.departmentName;
        var productPrice = parseFloat(answers.productPrice);
        var productQuantity = parseInt(answers.quantity);

        var query = connection.query(
            "INSERT INTO products SET ?", {
                product_name: productName,
                department_name: departmentName,
                price: productPrice,
                stock_quantity: productQuantity
            },
            function (err, res) {

                if (err) throw err;

                // AFFECTEDROWS = NUMBER OF ROWS INSERTED
                console.log(res.affectedRows + " product inserted!\n");

                goAgain();
            }
        );  
    }); // ************* end of prompt
} //************ end of add new product */


function goAgain() {

    inquirer.prompt([{
        type: 'confirm',
        message: 'Continue Managing Products?',
        name: 'confirm',
    }]).then(function (answers) {
        if (answers.confirm) {
            showManagerFront();
        } else {
            connection.end();
        }
    });
};