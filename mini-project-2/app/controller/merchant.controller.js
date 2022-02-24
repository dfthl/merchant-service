const db = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const rules = require('./validator');

var payload = {}

function signUp(req, res) {
    let insertQuery = `INSERT INTO merchant (password, name, address, phone_number) VALUES (?, ?, ?, ?);`
    let data = [req.body.password, req.body.name, req.body.address, req.body.phone_number]
    let validation = new Validator(req.body, rules.merchantRules);

    if (validation.passes() === true) {
        data[0] = bcrypt.hashSync(req.body.password, 10);
        db.query(insertQuery, data, function (error, results, fields) {
            if (error) throw error;
        });
        res.send ({message: 'Merchant has been registered.'})
    }
    else {res.status(400).send({message: 'Error on: ', data : validation.errors.all()})}

}

function login(req, res) {
    let param = [req.body.phone_number, req.body.password]
    let selectQuery = `SELECT * FROM merchant WHERE phone_number = ? AND isDeleted = False`

    db.query(selectQuery, param, function (error, results, fields) {
        if (error) throw error;
        if(results.length < 1) {
            return res.status(400).send({ message: 'Phone number or password is invalid.'})
        }

        // insformation about user saved to payload
        payload = {
            password: results[0].password,
            name: results[0].name,
            address: results[0].address,
            phone_number: results[0].phone_number,
        }
        bcrypt.compare(req.body.password, payload.password, function(err, result) {
            if (err) throw err;
            if (result == true){
    
                const token = jwt.sign(payload, 'secret', {expiresIn: '7d'})
    
                return res.send({ message: 'Login Success.', token: token })
            }
            else {return res.status(400).send({ message: 'Phone number or password is invalid.'})}
        });
    });
}

function deleteAccount(req, res) {
    let deletedQuery = `UPDATE merchant SET isDeleted = True WHERE id = ? AND isDeleted = False;`
    let data = [req.params.id, req.body.password]
    // res.send ({message: 'Merchant has been deleted.', data: [payload.password, req.body.password]})
    bcrypt.compare(req.body.password, payload.password, function(err, result) {
        if (err) res.status(400).send({message: 'Merchant not found. You should try to re-login.'});
        if (result == true){
            db.query(deletedQuery, data, function (err, deleted) {
                if (err) throw err;
            });

            res.send ({message: 'Merchant has been deleted.'})
        }
    })
}

module.exports = {
    signUp,
    login,
    deleteAccount
}