//require npm packages for this project

var inquirer = require('inquirer');
var mysql = require("mysql");
require('console.table');

//Global Variables
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
  showStoreFront();
});

//displays items and prompts for shopping selection
function showStoreFront() {

  connection.query("SELECT item_id AS 'Item ID', product_name AS 'Product', concat('$', format(price, 2)) AS 'Price' " 
                 + "FROM products WHERE stock_quantity > 0", 
    function (err, res) {
    if (err) throw err;
    //loop through query results and display to the user
    console.log("---------------- Bamazon Products-------------------\n");

    var itemArray = [];
    console.table(res);

    for (var i = 0; i < res.length; i++) {
      // console.log("Product ID: " + res[i].item_id + " | " 
      //           + "Product: " + res[i].product_name + " | " 
      //           + "Price:  $" + res[i].price);
      itemArray.push(res[i]['Item ID']);
    }
    console.log("-------------------------------------------------------------");
    inquirer.prompt([{
        type: 'input',
        message: 'Enter the product id of the item you wish to purchase: ',
        name: 'productID',
        validate: function (value) {
          if (value && itemArray.indexOf(parseInt(value)) !== -1) {
            return true;
          }
          return 'Please enter a valid product id: ';
        }
      },
      {
        type: 'input',
        message: 'Please enter quantity to purchase: ',
        name: 'quantity',
        validate: function (value) {
          if (value && isNaN(value) === false) {
            return true;
          }
          return 'Please enter a valid number for quantity: ';
        }
      }
    ]).then(function (answers) {

      processOrder(parseInt(answers.productID), parseFloat(answers.quantity));

    }); // ************* end of select all callback
  }); //***********End of select all query */
} //***********End of function createStoreFront */



function processOrder(productID, customerQuantity) {
  //Get the current quantity from the db
  var query = "SELECT stock_quantity, price FROM products where ?";
  connection.query(query, {
    item_id: productID
  }, function (err, res) {
    if (err) throw err;
    var stockQuantity = res[0].stock_quantity;
    var itemPrice = res[0].price;

    //check to see if quantity exists
    if (stockQuantity >= customerQuantity) {
      //all good - update the quantity in the db
      var query = "UPDATE products SET stock_quantity = stock_quantity - ? where item_id = ?";
      connection.query(query, [customerQuantity, productID], function (err, res) {

        if (err) throw err;

        totalDue = customerQuantity * itemPrice;
        console.log("Congratulations on your purchase!  Total Due: " + formatter.format(totalDue));
        updateProductSales(productID, totalDue);
      }); //end of update query

    } else {
      //Not enough in stock to process order
      console.log("Insufficient quantity! - Please try again with smaller quantity");
      goAgain();
    }
  });
}

function updateProductSales(productID, totalSales) {

  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{product_sales:totalSales}, {item_id:productID}], function (err, res) {

    if (err) throw err;
    goAgain();
  }); //end of update query
} //**********End of update product sales */

function goAgain() {

  inquirer.prompt([{
    type: 'confirm',
    message: 'Continue Shopping?',
    name: 'confirm',
  }]).then(function (answers) {
    if (answers.confirm) {
      showStoreFront();
    } else {
      connection.end();
    }
  });
};