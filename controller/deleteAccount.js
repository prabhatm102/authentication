const { User } = require("../model/user");

const deleteAccount = async(req,res,next)=>{
   const user = await User.findOne({_id:req.params.id});
     if(!user) return res.status(400).render("signin.pug",{msg:"Login first then continue!"});
  
     await User.deleteOne({_id:user._id});

    res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
    res.status(200).render("guest.pug",{msg:"Account Deleted Successfully!Sigup to continue"});  
};

module.exports = {
    deleteAccount : deleteAccount
}