const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const PositionsModel =
require("../model/PositionsModel");



router.get("/allPositions",

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



        const positions =
        await PositionsModel.find({

            userId:
            decoded.id,
        });




        res.json(positions);

    }

    catch (err) {

        console.log(err);

        res.status(500).json([]);
    }
});



module.exports = router;