const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("config");

const editProfile = async(req,res,next)=>{
     try{
        const decoded =  jwt.verify(req.cookies.authToken,config.get("jwtPrivateKey"));
        const user = await User.findOne({email:decoded.email});
          if(!user) throw(new Error("Unauthorised!"));
         
        user.name = req.body.name;      
        await user.save();

        const d= new Date();
        const expDate = new Date(d.setDate(d.getDate()+10));
        const token = user.genrateToken();
        res.cookie("authToken="+token+";path='/';expires="+expDate);

        res.status(200).redirect("/dashboard"); 
         
     }catch(ex){
         res.cookie("authToken=;"+"path='/';expires="+new Date("01/01/1900"));
         return res.status(401).render("guest.pug",{msg:"Unauthorised"});
     }
     
};


module.exports = {
    editProfile:editProfile    
}