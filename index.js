// import express from 'express';
// import path from 'path';

const express = require("express");
// const db= require('./config/mongoose')

const path = require("path");
const { connectMongoDb } = require("./config/mongoose");
const candidateModel = require("./model/candidate");
const PORT = 8000;

//server creation.
const app = express();

//-------------------------------------
//middleware to read the urlencoded data..
app.use(express.urlencoded());
//middleware to read json data.
app.use(express.json());

//custom middleware.-----------------------
let counter = 0;
app.use((req, res, next) => {
  counter++;
  console.log("number of request: ", counter);
  next();
});

app.get("/", (req, res) => {
  //__dirname is global root directory name.
  //____filename is globla current file name.
  return res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/home", (req, res) => {
  console.log(req.query);
  return res.send("This is the home page!");
});

app.get("/about/:id", (req, res) => {
  // return res.send('This is the about page!');
  return res.status(200).json({
    name: "Sunil",
    address: "Jharkhand",
    id: req.params.id,
  });
});

//CRUD API using in-memory database................

// const students= [
//     {
//         'name': 'Sunil',
//         'roll': 1
//     },
//     {
//         'name': "shankar",
//         'roll': 2
//     },
//     {
//         'name': 'manisha',
//         'roll': 3
//     }
// ]

// app.get('/students', (req, res)=>{
//     res.status(200).json({data: students});
// });

// app.post('/students', (req, res)=>{
//     students.push(req.body);
//     res.status(201).json({
//         data: students
//     })
// });

// app.put('/students/:roll', (req, res)=>{
//    const rollNumber= req.params.roll;
//    const index= students.findIndex((stud)=>stud.roll== rollNumber);

//    students[index]= req.body;

//    res.status(201).json({data: students});

// });

// app.delete('/students/:roll', (req, res)=>{
//     const rollNumber= req.params.roll;
//     const index= students.findIndex((stud)=>{
//         return stud.roll==rollNumber;
//     });

//     students.splice(index, 1);

//     res.status(200).json({data: students});
// })

// CRUD Operations using mongodb database.-----------------------------------------------------------------------

app.get("/students", async (req, res) => {
  const students = await candidateModel.find({});
  res.status(200).json({
    message: "students fetched successfully",
    data: students,
  });
});

app.post("/students", async (req, res) => {
  const student = await candidateModel.create(req.body);
  res.status(201).json({
    message: "student added successfully!",
    data: student,
  });
});

app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const student = await candidateModel.findById(id);
  if (student) {
    const student = await candidateModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }); //here {new: true} is send updated document.
    res.status(200).json({
      message: "student updated successfully!",
      data: student,
    });
  } else {
    res.status(401).json({
      message: "student not found",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is started");
  connectMongoDb();
});
