const express = require("express");
const candidateModel = require("../../model/candidate");
// const { middlware } = require("../../middleware/authMiddleware");
const middleware = require('../../middleware/authMiddleware');
// const { authMiddleware1 } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", middleware.authMiddleware1, async (req, res) => {
  const students = await candidateModel.find({});
  res.status(200).json({
    message: "students fetched successfully",
    data: students,
  });
});

router.post("/", async (req, res) => {
  try {
    let student = await candidateModel.findOne({ email: req.body.email });
    if (student) {
      return res.status(201).json({
        message: "Student already exist!",
        data: student,
      });
    }
    student = await candidateModel.create(req.body);
    res.status(201).json({
      message: "Student added successfully!",
      data: student,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/:id", middleware.authMiddleware2, async (req, res) => {
  const id = req.params.id;
  //   console.log(id);

  //checking if the user is same who is logged in 
  if(req.user.id!= req.params.id){
    res.status(401).json({
      message: 'Unauthorised'
    })
  }
  const student = await candidateModel.findById(id);
  if (student) {
    const student = await candidateModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }); //here {new: true} is send updated document.
    return res.status(200).json({
      message: "student updated successfully!",
      data: student,
    });
  } else {
   return  res.status(401).json({
      message: "student not found",
    });
  }
});

module.exports = router;
