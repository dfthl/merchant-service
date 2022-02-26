const db = require('../config/db')

let createMerchantQuery = `
CREATE TABLE IF NOT EXISTS merchant(
    id INT NOT NULL AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    join_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    phone_number BIGINT NOT NULL,
    createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    isDeleted BOOLEAN NULL DEFAULT FALSE,
    PRIMARY KEY (id)
)
COLLATE = 'utf8mb4_general_ci'
;`

db.query(createMerchantQuery, function(error, results, fields) {
    if (error) throw error;
    console.log("Table 'Merchant' has been created");
});

let createProductQuery = `
CREATE TABLE IF NOT EXISTS product(
    id INT NOT NULL AUTO_INCREMENT,
    merchant_id INT,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
    isDeleted BOOLEAN NULL DEFAULT FALSE,
    FOREIGN KEY (merchant_id) REFERENCES merchant (id),
    PRIMARY KEY (id)
)
COLLATE = 'utf8mb4_general_ci'
;`

db.query(createProductQuery, function(error, results, fields) {
    if (error) throw error;
    console.log("Table 'Product' has been created");
});