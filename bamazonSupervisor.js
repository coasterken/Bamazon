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
    showSupervisorFront();
});

//displays items and prompts for shopping selection
function showSupervisorFront() {

    console.log("-------------------------------------------------------------");
    inquirer.prompt([{
        type: 'rawlist',
        message: 'Select Bamazon supervisor option: ',
        choices: [
            'View Product Sales By Department',
            'Create New Department'
        ],
        name: 'supervisorOption'
    }]).then(function (answers) {

        switch (answers.supervisorOption) {
            case 'View Product Sales By Department':
                showProductSales();
                break;
            case 'Create New Department':
                createNewDepartment();
                break;
            default:
                console.log("Something really bad occurred!");
                connection.end();
                break;
        }

    }); // ************* end of select all callback
} //***********End of function createStoreFront */

//displays sales by department
function showProductSales() {

    connection.query("SELECT d.department_id AS 'Department ID', " +
        "d.department_name AS 'Department Name', " +
        "concat('$', format(d.over_head_costs, 2)) AS 'Over Head Costs', " +
        "COALESCE(concat('$', format(sum(p.product_sales), 2)), 'No Product' )AS 'Product Sales', " + 
        "COALESCE(concat('$', format(sum(p.product_sales) - d.over_head_costs, 2)), '') AS 'Total Profit' " +         
        "FROM departments d LEFT JOIN products p " +
        "ON d.department_name = p.department_name " +
        "GROUP BY d.department_id" ,
        function (err, res) {

            if (err) throw err;

            //loop through query results and display to the user
            console.log("---------------- Bamazon Sales By Department -------------------\n");
            console.table(res);
            goAgain();

        }); //***********End of select all query */
} // *********** end of show all products

function createNewDepartment() {
    //manager selects item to adjust
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the new department name: ',
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
            message: 'Please enter overhead costs: ',
            name: 'overHeadCost',
            validate: function (value) {
                if (value && isNaN(value) === false) {
                    return true;
                }
                return 'Please enter a valid overhead cost: ';
            }
        }
    ]).then(function (answers) {

        var departmentName = answers.departmentName;
        var overHeadCost = parseFloat(answers.overHeadCost);

        var query = connection.query(
            "INSERT INTO departments SET ?", {
                department_name: departmentName,
                over_head_costs: overHeadCost,
            },
            function (err, res) {

                if (err) throw err;

                // AFFECTEDROWS = NUMBER OF ROWS INSERTED
                console.log(res.affectedRows + " " + departmentName + " department created!\n");
                goAgain();
            }
        );
    }); // ************* end of prompt
} //************ end of add new product */


function goAgain() {

    inquirer.prompt([{
        type: 'confirm',
        message: 'Continue Managing Departments?',
        name: 'confirm',
    }]).then(function (answers) {
        if (answers.confirm) {
            showSupervisorFront();
        } else {
            connection.end();
        }
    });
};