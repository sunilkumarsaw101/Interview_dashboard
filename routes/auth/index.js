const express = require("express");
const candidateModel = require("../../model/candidate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await candidateModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    //if user exist.
    if (user) {
      //sending cookie to client;
      res.cookie("user", user.email);

      res.status(200).json({
        message: "logged successfully",
        user,
        role: "candidate",
      });
    }

    //if user does not exist.
    res.status(401).json({
      message: "unauthorize user",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
