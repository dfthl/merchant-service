const db = require('../config/db')

let petData = [
    {name: "doggie"},
    {name: "blacky"},
    {name: "fishy"},
]

petData.forEach(value => {
    let insertQuery = `INSERT INTO pet (name) VALUES (?);`
    db.query(insertQuery, value.name, function (error, results,fields) {
        if (error) throw error;
        console.log('Data has been inserted');
    });
});

let storeData = [
    {petId: "7"},
]

storeData.forEach(value => {
    let insertQuery = `INSERT INTO store (petId) VALUES (?);`
    db.query(insertQuery, value.petId, function (error, results,fields) {
        if (error) throw error;
        console.log('Data has been inserted');
    });
});

let userData = [
    {username: "fatah"},
]

userData.forEach(value => {
    let insertQuery = `INSERT INTO user (username) VALUES (?);`
    db.query(insertQuery, value.username, function (error, results,fields) {
        if (error) throw error;
        console.log('Data has been inserted');
    });
});