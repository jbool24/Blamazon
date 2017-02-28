const db = require('./database');


exports.displayAllProducts = function allProducts() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, data) => {
            if (err)
                reject(err);

            console.log(`Items for Sale Today:`, '\n');

            data.forEach((d) => {
                // Formats the Product List
                const productLen = d.product_name.length;
                const priceLen = d.price.toString().length;
                const catLen = d.department_name.length;
                const adjustedRepeat = productLen + priceLen + catLen;
                const separator = ".".repeat(40 - adjustedRepeat)

                console.log(`${d._id}.) ${ (d.product_name).toUpperCase()} (${d.department_name})${separator}\$${d.price}`);
                resolve(true);
            });
        });
    })
}

exports.productList = function productList() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (err, data) => {
            if (err)
                reject(err);

            let list = data.map((d, idx) => {
                return (idx + 1) + " " + d.product_name;
            });

            resolve(list);
        });
    });
}


exports.productInfo = function productInfo(field, next) {
    db.query('SELECT ?? FROM products', [field], (err, data) => {

        let arr = data.map((d) => {
            return d[field];
        });
        next(arr);
    });
}

exports.validatePurchase = function validatePurchase(order) {

    return new Promise((resolve, reject) => {
        getCurrentStock(order.product).then((stock) => {

            if (stock >= order.quantity) {
              resolve({ result: true, amount: stock });
            } else {
              reject("Sorry. There is no stock right now.");
            }
        }).catch((err) => console.log(err));
    })
}

exports.getCurrentStock = getCurrentStock;

function getCurrentStock(productID) {
    return new Promise((resolve, reject) => {
        db.query('SELECT stock_quantity FROM products where _id = ?', productID, (err, data) => {
            if (err)
                reject(err);

            resolve(data[0].stock_quantity);
        });
    });
}

exports.updateStock = function updateStock(productID, quantity) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE products SET stock_quantity = ? WHERE _id = ?', [quantity, productID], (err, data) => {
            if (err)
                reject(err)
            resolve(data);
        });
    });
}
