const { User } = require("../model/user")
const nodemailer = require("nodemailer");
const config = require("config");

const sendmail = async(req,res,next)=>{
   const user = await User.findOne({email:req.body.email});
      if(!user) return res.status(200).render("forgetpassword.pug",{msg:"Invalid Email!"});
   
      const token = user.genrateToken();

      const d= new Date();
      d.setTime(d.getTime()+1000*60*10);
     // console.log(d.toLocaleTimeString());
      const expDate = d.toUTCString(); 
       
       const link = req.get("origin")+"/changepassword"; 

      res.cookie("verify="+token+";expires="+expDate);

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
          subject:"Verify your email",
          html:"<h2>Click on the below link to reset password</h2><br><a href="+link+">Forget Password</a>"
      } 
     transporter.sendMail(mailOptions,function(error,info){
           if(error) 
              res.status(500).render("forgetpassword.pug",{msg:"Something Went wrong!Try again",isSent:"false"});
           else
              res.status(200).render("forgetpassword.pug",{isSent:"true"});
        });          
    }

module.exports = {
    sendmail:sendmail
}