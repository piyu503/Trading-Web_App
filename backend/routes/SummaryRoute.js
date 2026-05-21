const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const HoldingsModel =
require("../model/HoldingsModel");



router.get("/summary",

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




        let totalInvestment = 0;

        let currentValue = 0;




        holdings.forEach((stock) => {

            totalInvestment +=
            stock.avg *
            stock.qty;

            currentValue +=
            stock.price *
            stock.qty;
        });




        const pnl =
        currentValue -
        totalInvestment;




        res.json({

            success: true,

            totalInvestment,

            currentValue,

            pnl,

            holdingsCount:
            holdings.length,
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