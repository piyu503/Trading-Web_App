const { model } = require("mongoose");
const {Schema} = require("Mongoose");

const PositionsSchema=new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
})

module.exports = {PositionsSchema};