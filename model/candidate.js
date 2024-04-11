const mongoose= require('mongoose');

const candidateSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true  //it will add the time in database when any document is created.
});


//model
const candidateModel= mongoose.model('Students', candidateSchema);

module.exports= candidateModel;