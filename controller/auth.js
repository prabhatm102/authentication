const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const auth = async(req,res,next)=>{
   const user = await User.findOne({email:req.body.email});
     if(!user) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
   
   const isValid = await bcrypt.compare(req.body.password,user.password);
     if(!isValid) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
    const token = user.genrateToken();

    const d= new Date();
    const expDate = new Date(d.setDate(d.getDate()+10));

    res.cookie("authToken="+token+";path='/';expires="+expDate);
    res.status(200).header('x-auth-token',token).redirect("/dashboard");  
};

module.exports = {
    auth :auth
}