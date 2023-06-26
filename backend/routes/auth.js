const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")



const JWT_SECRET = "vaibhavisgoodbo3y";

// Route-1 creating a new user using post request "localhost:5000/api/auth/createuser" end point no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast contain 5 character ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;    // cheacking errors in input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:success , errors: errors.array()});
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success:success ,errors: "Sorry user with this email is alredy exist " });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // creating user using User schema
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // creating jwt token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route-2  loging using post request "localhost:5000/api/auth/login" end point no login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    // cheacking errors in input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // destructuring from body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login using correct credentials" });
      }
      const passComp = await bcrypt.compare(password, user.password);
      if (!passComp) {
        return res
          .status(400)
          .json({ success,error: "Please try to login using correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route-2  Get logged in user details "localhost:5000/api/auth/login" end point login required
router.get("/getuser",fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
