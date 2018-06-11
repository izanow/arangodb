const Database = require('arangojs').Database;
const db = new Database();
db.useDatabase('books');
module.exports = db;
