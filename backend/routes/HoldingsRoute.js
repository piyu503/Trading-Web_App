const router =
require("express").Router();

const HoldingsModel =
require("../model/HoldingsModel");

const jwt =
require("jsonwebtoken");



router.get("/allHoldings",

async (req, res) => {

    try {

        const token =
        req.cookies.token;



        if (!token) {

            return res.json({
                success: false,
            });
        }



        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );



        const holdings =
        await HoldingsModel.find({

            userId:
            decoded.id,
        });



        res.json(holdings);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
        });
    }
});



module.exports = router;