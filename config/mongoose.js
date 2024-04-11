const mongoose= require('mongoose');
 
// mongoose.connect('mongodb://localhost:27017/interview_dashboard');

// const db= mongoose.connection;

// db.on('open', ()=>{
//     console.log('Mongodb connected successfully');
// });

// module.exports= db;


//other way to connect---------------------------------------------------------

 exports.connectMongoDb= async()=>{
    await mongoose.connect('mongodb://localhost:27017/interview_dashboard');
    console.log('mongoDB connected successfully');
}

