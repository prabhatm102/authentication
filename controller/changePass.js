const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const config = require("config");
const bcrypt = require("bcrypt");

const changePass = async(req,res,next)=>{
   try{
       const decoded =  jwt.verify(req.cookies.verify,config.get("jwtPrivateKey"));

       const user = await User.findOne({email:decoded.email});
         if(!user) throw(new Error("Unauthorised!"));
        
         const salt = await bcrypt.genSalt(10);
         const hashedPass = await bcrypt.hash(req.body.cnfPass,salt);
         user.password = hashedPass;
     
       await user.save();

       res.cookie("verify=;path='/';expires="+new Date("01/01/1900"));
       res.render("signin.pug",{msg:"Password updated!Sign in to continue"}); 
        
    }catch(ex){
        res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
        return res.status(401).render("guest.pug",{msg:"Unauthorised"});
    }
    
};
module.exports = {
    changePass : changePass
}