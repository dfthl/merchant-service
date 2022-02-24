const db = require('../config/db')

let updateQuery = `UPDATE pet SET STATUS = ? WHERE ID = ?`
let data = ['sold', 1]
db.query(updateQuery, data, function(err, updated) {
    if (err) throw err;
    console.log(updated);
});