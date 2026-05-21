const jwt = require("jsonwebtoken");

const User =
require("../model/UserModel");



module.exports.userVerification =

async (req, res) => {

  const token =
  req.cookies.token;



  if (!token) {

    return res.json({
      status: false,
    });
  }



  try {

    const decoded =
    jwt.verify(

      token,

      process.env.JWT_SECRET
    );



    const user =
    await User.findById(
      decoded.id
    );



    if (!user) {

      return res.json({
        status: false,
      });
    }



    return res.json({

      status: true,

      user: {

        username:
        user.username,

        email:
        user.email,
      },
    });

  }

  catch (err) {

    return res.json({
      status: false,
    });
  }
};