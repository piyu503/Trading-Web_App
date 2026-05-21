const mongoose =
require("mongoose");



const PositionsSchema =
new mongoose.Schema({

    userId: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
    },



    product: String,

    name: String,

    qty: Number,

    avg: Number,

    price: Number,

    net: String,

    day: String,

    isLoss: Boolean,
});



const PositionsModel =
mongoose.model(

    "Position",

    PositionsSchema
);



module.exports =
PositionsModel; 