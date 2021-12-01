const error = require("../middleware/error");
const auth = require("../middleware/auth");

const express = require("express"); 
const cookieParser = require("cookie-parser");
const pug = require("pug");

const users = require("../routes/user");
const login = require("../routes/auth");
const sendmail = require("../routes/sendmail");

const { isLogin } = require("../middleware/isLogin");
const { isVerify } = require("../middleware/isVerify");

module.exports = function(app){
  
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
   // API
    app.use("/api/users",users);
    app.use("/api/logins",login);
    app.use("/api/sendmail",sendmail);

    //Templates
    app.get("/",isLogin,(req,res,next)=>{ 
       res.render("guest.pug");
    });
    app.get("/signup",isLogin,(req,res)=>{
       res.render("signup.pug");
    });
    app.get("/signin",isLogin,(req,res)=>{
      res.render("signin.pug");
    });
    app.get("/forgetpassword",isLogin,(req,res)=>{
      res.render("forgetpassword.pug");   
    });
    app.get("/changePassword",isLogin,isVerify,(req,res)=>{
      res.render("changepassword.pug");
    });
    app.get("/dashboard",auth,(req,res)=>{
       res.render("dashboard.pug",{msg:"Welcome "+req.user.name,id:req.user._id});
    });

    app.get('*',isLogin,(req,res)=>{
       res.render('guest.pug',{msg:"404 page not found!"})
    });
    app.use(error);    
}

