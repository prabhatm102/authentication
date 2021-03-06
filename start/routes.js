const error = require("../middleware/error");
const auth = require("../middleware/auth");
const { isLogin } = require("../middleware/isLogin");
const { isVerify } = require("../middleware/isVerify");

const express = require("express"); 
const cookieParser = require("cookie-parser");
const pug = require("pug");
const favicon = require("serve-favicon");

const users = require("../routes/user");
const login = require("../routes/auth");
const { User } = require("../model/user");

const path = require("path");

module.exports = function(app){
    app.use(express.static("views/"));
    app.use(express.static("public/"));
    app.use(favicon("views/images/favicon.ico"));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
   // API
    app.use("/api/users",users);
    app.use("/api/logins",login);

  //Templates
  // Before Login  
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
    app.get("/changePassword/:token",isLogin,isVerify,(req,res)=>{
      res.render("changepassword.pug");
    });

  // After Login  
    app.get("/dashboard",auth,async(req,res)=>{
          const users = await User.find({}).select("-__v");
          res.render("dashboard.pug",{msg:"Welcome "+req.user.name,id:req.user._id,isAdmin:req.user.isAdmin,users:users});
       
       // console.log(users);
    });
    app.get("/public/uploads/:file",auth,async(req,res)=>{
        res.download(path.join(__dirname,"../","public/uploads/")+req.params.file);
      
    });


    app.get("/editprofile/:id",auth,async(req,res)=>{
        const user = await User.findOne({_id:req.params.id});
        res.render("editprofile.pug",{id:user._id,name:user.name,email:user.email,isActive:user.isActive,isAdmin:req.user.isAdmin});        
    });
  
  // Invalid request
    app.get('*',isLogin,(req,res)=>{
       res.render('guest.pug',{msg:"404 page not found!"})
    });
    app.use(error);    
}

