const {model} =require("mongoose");

const {HoldingsSchema} = require("../schemas/HoldingsSchema");

const HoldingsModel = new model("holding",HoldingsSchema);  //plural will add , make this as collection name 

module.exports = {HoldingsModel};