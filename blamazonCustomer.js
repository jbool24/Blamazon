
const inquirer = require('inquirer');
const utils = require('./services');

function task() {
    return inquirer.prompt({
        name: "task",
        type: "rawlist",
        message: "What would you like to do today?\n",
        choices: ["Shop", "Check Stock", "Leave Store"]
    }).then((result) => {
        startShopping(result.task)
    }).catch(console.log);
}

function startShopping(task) {
    const questions = [
        {
            name: "product",
            type: "input",
            message: "Please select an item to purchase by id number.\n"
        }, {
            name: "quantity",
            type: "input",
            message: "How many do you want?\n"
        }
    ];

    if (task === "Leave Store") {
        process.exit();
    } else if (task === "Check Stock") {
        checkStock();
    } else {
        inquirer.prompt(questions).then((answers) => {
            console.log('Your Order:---------------------------\n')
            console.log(`Item: ${answers.product}\n Qty: ${answers.quantity}\n`);
            confirmOrder(answers);
        }).catch(console.log);
    }
}

function confirmOrder(order) {
    const confirmation = [
        {
            type: "confirm",
            message: "Are you sure you want to purchase?",
            name: "confirm"
        }
    ];

    inquirer.prompt(confirmation).then(user => {
        if (user.confirm === true) {
            validate(order);
        } else {
            console.log("Ok. Well put that back on the shelf.\n");
            task();
        }
    });
}

function validate(order) {
    utils.validatePurchase(order).then(data => {
        if (data.result === true)
          completePurchase(order, data.amount);
        }
    ).catch((e) => {
      console.log(e);
      task();
    });
}

function completePurchase(order, currentStock) {
    const updatedAmount = (currentStock - order.quantity);
    utils.updateStock(order.product, updatedAmount).then((result) => {
        console.log("Successful Purchase. Thanks for shopping.\n")
        task();
    }).catch((err) => {
        console.log(err)
        task();
    });
}

function checkStock() {
    utils.productList().then((list) => {
        const question = [
            {
                type: "list",
                message: "Select the Id of the item you would like to check on.",
                name: "stockItem",
                choices: list
            }
        ];

        inquirer.prompt(question).then(user => {
            let stock = 0;

            utils.getCurrentStock(list.indexOf(user.stockItem) + 1).then((current) => {
                console.log(current)
                stock = current;
                if (stock > 0) {
                    console.log(`The Current Stock is: ${stock} items.`);
                } else {
                    console.log("Sorry. We have no stock at this time");
                }
                task();
            }).catch(console.log);
        }).catch(console.log);
    });
}

// Display all products for sale including id
utils.displayAllProducts().then((done) => {
    if (done === true)
        task();
    }
);
