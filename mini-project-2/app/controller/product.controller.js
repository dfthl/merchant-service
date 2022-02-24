const db = require('../../config/db');
let Validator = require('validatorjs'); // npm install validatorjs
const rules = require('./validator');

function listProduct(req, res) {
    let selectQuery = `SELECT * FROM product WHERE merchant_id = (?) AND isDeleted = False;`
    let data = [req.params.id]
    db.query(selectQuery, data, function (error, results, fields) {
        if (error) throw error;
        
        res.send ({message: 'Data is found.', data : results})
    });
}

function entryProduct(req, res) {
    let insertProductQuery = `INSERT INTO product (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?);`
    let data = [req.params.id, req.body.name, req.body.quantity, req.body.price]
   
    let validation = new Validator(req.body, rules.productRules);
    if (validation.passes() === true) {
        db.query(insertProductQuery, data, function (error, results, fields) {
            if (error) throw error;
        });
        res.send ({message: 'Product has been inserted.', data : data})
    }
    else {res.send({message: 'Error on: ', data : validation.errors.all()})}
}

function updateProduct(req, res) {
    let updateQuery = `UPDATE product SET name = ?,  quantity = ?,  price = ?, updatedAt = CURRENT_TIMESTAMP() WHERE id = ? AND isDeleted = False;`
    let data = [req.body.name, req.body.quantity, req.body.price, req.params.id]
    let validation = new Validator(req.body, rules.productRules);
    if (validation.passes() === true) {
        db.query(updateQuery, data, function (error, results, fields) {
            if (error) throw error;
        });
        res.send ({message: 'Product has been updated.', data : data})
    }
    else {res.send({message: 'Error on: ', data : validation.errors.all()})}
}

function deleteProduct(req, res) {
    let deletedQuery = `UPDATE product SET isDeleted = True WHERE id = ? AND isDeleted = False;`
    let data = [req.params.id]
    db.query(deletedQuery, data, function (err, deleted) {
        if (err) throw err;
    });

    res.send ({message: 'Product has been deleted.'})
}



module.exports = {
    listProduct,
    entryProduct,
    updateProduct,
    deleteProduct
}