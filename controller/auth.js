const { User } = require("../model/user");
const bcrypt = require("bcrypt");

var invalidCount = 1;
const auth = async(req,res,next)=>{
  if(req.cookies.invalidCount >= 3)
    return res.status(400).render("signin.pug",{msg:"You have entered wrong email/password 3 times! Try after some times!"});
  let d= new Date();
     d.setTime(d.getTime()+1000*60);
 // console.log(d.toLocaleTimeString());
   let expDate = d.toUTCString(); 
  res.cookie("invalidCount="+(invalidCount++)+";expires="+expDate);

    const searchObj={
      email:req.body.email,
      isAdmin:req.body.isAdmin
    }

    const user = await User.findOne(searchObj);
      if(!user) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
   
    const isValid = await bcrypt.compare(req.body.password,user.password);
      if(!isValid) return res.status(400).render("signin.pug",{msg:"Invalid Email Or Password!"});
    
    if(!user.isActive) return res.status(400).render("signin.pug",{msg:"You are disabled from login!"});
    
    const token = user.genrateToken();

     d= new Date();
     expDate = new Date(d.setDate(d.getDate()+10));
     invalidCount = 0;
    res.cookie("invalidCount="+invalidCount+";expires="+expDate);

    res.cookie("authToken="+token+";path='/';expires="+expDate);
    
    res.status(200).header('x-auth-token',token).redirect("/dashboard");  
};

module.exports = {
    auth :auth
}