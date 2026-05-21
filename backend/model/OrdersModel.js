const mongoose =
require("mongoose");



const OrdersSchema =
new mongoose.Schema({

    userId: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
    },



    name: String,

    qty: Number,

    price: Number,

    mode: String,
});



const OrdersModel =
mongoose.model(

    "Order",

    OrdersSchema
);



module.exports =
OrdersModel;