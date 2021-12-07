const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const config = require("config");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

     //Send Mail for acknowledgement  

       const link = req.get("origin")+"/signin";
         var transporter = nodemailer.createTransport({
           service:"gmail",
           auth:{
               user:"dummyrudra@gmail.com",
               pass:config.get("mailPass")
           }
         });
        var mailOptions = {
           from:"dummyrudra@gmail.com",
           to:user.email,
           subject:"Security Updated",
           html:"<h2>Your password has been updated successfully!</h2><br><a href="+link+">SignIn to continue</a>"
         } 
    
        transporter.sendMail(mailOptions,function(error,info){
             if(error) 
             res.status(500).render("signin.pug",{msg:"Something Went wrong!Try again"});
             else
             res.render("signin.pug",{msg:"Password updated!Sign in to continue"}); 
        });                       
    }catch(ex){
        res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
        return res.status(401).render("guest.pug",{msg:"Unauthorised"});
    }
    
};
module.exports = {
    changePass : changePass
}