const mysql = require('mysql');

function createAndConnectDB() {
  const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    database: 'bamazonDB',
    user: 'blamazon-user',
    password: 'blamazon',
  });

  db.connect((err) => {
    if (err)
    throw new Error(err)
    console.log(`Welcome To the Blamazon Store`, '\n');
  });

  return db;
}

const db = createAndConnectDB();

module.exports = db;
