const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const OrdersModel =
require("../model/OrdersModel");



router.get("/allOrders",

async (req, res) => {

    try {

        const token =
        req.cookies.token;



        if (!token) {

            return res.json([]);
        }



        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );



        const orders =
        await OrdersModel.find({

            userId:
            decoded.id,
        });




        res.json(orders);

    }

    catch (err) {

        console.log(err);

        res.status(500).json([]);
    }
});



module.exports = router;