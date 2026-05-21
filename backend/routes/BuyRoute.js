const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const HoldingsModel =
require("../model/HoldingsModel");

const OrdersModel =
require("../model/OrdersModel");



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

            qty,

            price,

            mode,
        });




        // CHECK EXISTING HOLDING

        const existingHolding =
        await HoldingsModel.findOne({

            userId:
            decoded.id,

            name,
        });




        if (existingHolding) {

            existingHolding.qty +=
            Number(qty);

            existingHolding.price =
            price;

            await existingHolding.save();
        }

        else {

            await HoldingsModel.create({

                userId:
                decoded.id,

                name,

                qty,

                avg: price,

                price,

                net: "+0%",

                day: "+0%",
            });
        }




        res.json({

            success: true,

            message:
            "Stock bought successfully",
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
        });
    }
});



module.exports = router;