let merchantRules = {
    name: 'required|min:3|max:50',
    password: 'required|min:6',
    address: 'required',
    phone_number: 'required|integer',
}

let productRules = {
    name: 'required|min:3|max:50',
    quantity: 'required|min:1|integer',
    price: 'required|min:10000|integer',
}

exports.merchantRules = merchantRules
exports.productRules = productRules