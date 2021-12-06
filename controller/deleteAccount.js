const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("config");

const deleteAccount = async(req,res,next)=>{
   const user = await User.findOne({_id:req.params.id});
     if(!user) return res.status(400).render("signin.pug",{msg:"Login first then continue!"});
  
     await User.deleteOne({_id:user._id});

    const decoded =  jwt.verify(req.cookies.authToken,config.get("jwtPrivateKey"));
        if(decoded.isAdmin){
            return res.status(200).redirect("/dashboard");
        }
    res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
    res.status(200).render("guest.pug",{msg:"Account Deleted Successfully!Sigup to continue"});  
};

module.exports = {
    deleteAccount : deleteAccount
}