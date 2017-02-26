const db = require('./database');
const inquirer = require('inquirer');


function allProducts(){
  db.query('SELECT * FROM products', (err, data) => {
    console.log(`Available Products:`);
    data.forEach((d) => {
        console.log(`${(d.product_name).toUpperCase()} (${d.department_name})................\$${d.price}`)
    });
  });
}
// allProducts()

inquirer.prompt([

    {
        name: "initAction",
        type: "list",
        message: "Please select an item to purchase\n",
        choices: [],
    }, {
        type: "password",
        message: "Pick a secret passphrase.",
        name: "passphrase"
    }, {
        type: "list",
        message: "Now choose a super power.",
        choices: [
            "Fly", "Throw Fire", "Read Minds", "Breath Under-Water", "Bend Metal"
        ],
        name: "superpower"
    }, {
        type: "checkbox",
        message: "Now choose a location.",
        choices: [
            "Middle-Earth", "Ferngully", "Narnia", "Oz"
        ],
        name: "location"
    }, {
        type: "confirm",
        message: "Are you ready for an adventure?",
        name: "confirm",
        default: true
    }
])
