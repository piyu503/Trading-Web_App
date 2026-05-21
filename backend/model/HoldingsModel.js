const mongoose = require("mongoose");



const HoldingsSchema =
new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
    },



    name: String,

    qty: Number,

    avg: Number,

    price: Number,

    net: String,

    day: String,
});



const HoldingsModel =
mongoose.model(

    "Holding",

    HoldingsSchema
);



module.exports =
HoldingsModel;