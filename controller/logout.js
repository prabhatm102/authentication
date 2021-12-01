const { User } = require("../model/user");

const logout = async(req,res,next)=>{
   const user = await User.findOne({_id:req.params.id});
     if(!user) return res.status(400).render("signin.pug",{msg:"Login first then continue!"});

  res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
    res.status(200).redirect("/");  
};

module.exports = {
    logout : logout
}