const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const auth = async(req,res,next)=>{
   const user = await User.findOne({email:req.body.email});
     if(!user) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
   
   const isValid = await bcrypt.compare(req.body.password,user.password);
     if(!isValid) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
    const token = user.genrateToken();
    res.status(200).render("dashboard.pug",{msg:"Successfully Logged In "+user.name});  
};

module.exports = {
    auth :auth
}