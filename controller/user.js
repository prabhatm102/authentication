const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const getUserById = async(req,res,next)=>{
    const user = await User.findOne({name:req.user.name}).select("name email -_id");
    res.status(200).send(user);
}

const addUser = async(req,res,next)=>{
    const email = await User.findOne({email:req.body.email});
      if(email) return res.status(403).render("signup.pug",{msg:"Email Already Exists!"});
    const user =new User({
        name:req.body.name,
        email:req.body.email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    user.password = hashedPass;

      await user.save();
      const token = user.genrateToken();
      res.header('x-auth-token',token).render('signin.pug',{color:'success',msg:"You are Successfully Registered! Please Login To Continue"});
};

const updateUser = async(req,res,next)=>{

};

const deleteUser = async(req,res,next)=>{
   
}

module.exports = {
    getUserById:getUserById,
    addUser:addUser
    
}