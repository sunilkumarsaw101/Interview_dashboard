const mongoose= require('mongoose');

const adminSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
}, {timestamp:true} );

const adminModel= mongoose.model('Admin', adminSchema);

module.exports= adminModel;