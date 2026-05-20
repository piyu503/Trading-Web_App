const router =
require("express").Router();

const jwt =
require("jsonwebtoken");

const User =
require("../model/UserModel");

const {
  userVerification
} = require("../middleware/auth");



// SIGNUP
router.post(
  "/signup",

  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;



      // CHECK USER
      const existingUser =
      await User.findOne({ email });



      if (existingUser) {

        return res.json({

          success: false,

          message:
          "User already exists",
        });
      }



      // CREATE USER
      const user =
      await User.create({

        username,
        email,
        password,
      });



      // CREATE TOKEN
      const token = jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );



      // STORE COOKIE
      res.cookie(

        "token",

        token,

        {
          withCredentials: true,

          httpOnly: false,
        }
      );



      res.status(201).json({

        success: true,

        message:
        "Signup successful",
      });

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
        "Server Error",
      });
    }
  }
);






// LOGIN
router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;



      // FIND USER
      const user =
      await User.findOne({ email });



      if (!user) {

        return res.json({

          success: false,

          message:
          "Invalid email or password",
        });
      }



      // CHECK PASSWORD
      const isMatch =
      await user.comparePassword(
        password
      );



      if (!isMatch) {

        return res.json({

          success: false,

          message:
          "Invalid email or password",
        });
      }



      // CREATE TOKEN
      const token = jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );



      // STORE COOKIE
      res.cookie(

        "token",

        token,

        {
          withCredentials: true,

          httpOnly: false,
        }
      );



      res.status(200).json({

        success: true,

        message:
        "Login successful",
      });

    }

    catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
        "Server Error",
      });
    }
  }
);






// VERIFY USER
router.post(
  "/verify",

  userVerification
);



module.exports = router;