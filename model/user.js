const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        maxlength:255
    }
});

userSchema.methods.genrateToken = function(){
    const userInfo = {
        name:this.name
    }
    return jwt.sign(userInfo,config.get("jwtPrivateKey"));
}

const User = mongoose.model("users",userSchema);


module.exports.User = User;