const express = require("express");
const candidateModel = require("../../model/candidate");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("../../config/passportLocalStrategy");

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      console.log("passport user", req.user);

      // const user = await candidateModel.findOne({
      //   email: req.body.email,
      //   password: req.body.password,
      // });

      //if user exist.
      // if (user) {
      //sending cookie to client, here passing user email in the cookie;
      // res.cookie("user", user.email);

      //creating token.
      // const token = jwt.sign(user.email, "test"); //here user.email is payload and test is the key.
      // //sending cookie to client, here passing token in the cookie
      // res.cookie("user", token);

      return res.status(200).json({
        message: "logged successfully",
        // user,
        user: req.user,
        role: "candidate",
      });
      // }

      //if user does not exist.
      return res.status(401).json({
        message: "unauthorize user",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

module.exports = router;
