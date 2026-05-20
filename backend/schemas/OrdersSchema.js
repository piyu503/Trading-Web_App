const { Schema } = require("mongoose"); //curly brackets helps to extract schema from mongoose directly 

const OrdersSchema = new Schema({
    name : String,
    qty: Number,
    price: Number,
    mode: String
})

module.exports = {OrdersSchema};