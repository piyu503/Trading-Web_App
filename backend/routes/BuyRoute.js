const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const HoldingsModel =
require("../model/HoldingsModel");

const OrdersModel =
require("../model/OrdersModel");

const PositionsModel =
require("../model/PositionsModel");



router.post("/buy",

async (req, res) => {

    try {

        const token =
        req.cookies.token;



        if (!token) {

            return res.json({

                success: false,

                message:
                "User not logged in",
            });
        }



        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );



        const {

            name,

            qty,

            price,

            mode,

        } = req.body;




        // CREATE ORDER

        await OrdersModel.create({

            userId:
            decoded.id,

            name,

            qty:
            Number(qty),

            price:
            Number(price),

            mode,
        });




        // FIND HOLDING

        const existingHolding =
        await HoldingsModel.findOne({

            userId:
            decoded.id,

            name,
        });




        // FIND POSITION

        const existingPosition =
        await PositionsModel.findOne({

            userId:
            decoded.id,

            name,
        });




        // ======================
        // BUY LOGIC
        // ======================

        if (mode === "BUY") {

            if (existingHolding) {

                existingHolding.qty +=
                Number(qty);

                existingHolding.price =
                Number(price);

                await existingHolding.save();
            }

            else {

                await HoldingsModel.create({

                    userId:
                    decoded.id,

                    name,

                    qty:
                    Number(qty),

                    avg:
                    Number(price),

                    price:
                    Number(price),

                    net: "+0%",

                    day: "+0%",
                });
            }




            if (existingPosition) {

                existingPosition.qty +=
                Number(qty);

                existingPosition.price =
                Number(price);

                await existingPosition.save();
            }

            else {

                await PositionsModel.create({

                    userId:
                    decoded.id,

                    product: "CNC",

                    name,

                    qty:
                    Number(qty),

                    avg:
                    Number(price),

                    price:
                    Number(price),

                    net: "+0%",

                    day: "+0%",

                    isLoss: false,
                });
            }
        }




        // ======================
        // SELL LOGIC
        // ======================

        else {

            if (!existingHolding) {

                return res.json({

                    success: false,

                    message:
                    "No holdings found",
                });
            }




            if (
                existingHolding.qty <
                Number(qty)
            ) {

                return res.json({

                    success: false,

                    message:
                    "Insufficient quantity",
                });
            }




            // REDUCE HOLDINGS

            existingHolding.qty -=
            Number(qty);




            if (
                existingHolding.qty === 0
            ) {

                await HoldingsModel.deleteOne({

                    _id:
                    existingHolding._id,
                });
            }

            else {

                await existingHolding.save();
            }




            // REDUCE POSITIONS

            if (existingPosition) {

                existingPosition.qty -=
                Number(qty);




                if (
                    existingPosition.qty === 0
                ) {

                    await PositionsModel.deleteOne({

                        _id:
                        existingPosition._id,
                    });
                }

                else {

                    await existingPosition.save();
                }
            }
        }




        res.json({

            success: true,

            message:
            `${mode} successful`,
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message:
            err.message,
        });
    }
});



module.exports = router;