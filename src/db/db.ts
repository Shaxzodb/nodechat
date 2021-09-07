const mongoose=require('mongoose');
import Joi from 'joi';
// USERS
const CreateUsers = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    date:{
        type:Date,
        default:Date.now
    }
});
let Users=mongoose.model('Users',CreateUsers);
// MESSAGES
const CreateMessage=new mongoose.Schema({
    message:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    }
});
const Messages=mongoose.model('Messages',CreateMessage);

export {Users,Messages};
