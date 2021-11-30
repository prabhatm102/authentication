const error = require("../middleware/error");
const users = require("../routes/user");
const express = require("express"); 
const pug = require("pug");
const login = require("../routes/auth");
const callApi = require("../routes/callApi");
const axios = require("axios");

module.exports = function(app){
  
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
   // API
    app.use("/api/users",users);
    app.use("/api/logins",login);
 
    //Templates
    app.get("/",(req,res)=>{
       res.render("guest.pug");
    });
    app.get("/signup",(req,res)=>{
       res.render("signup.pug");
    });
    app.get("/signin",(req,res)=>{
      res.render("signin.pug");
    });
    app.get("/forgetpassword",(req,res)=>{
      res.render("forgetpassword.pug");   
    });

   
   //  app.use("/user",callApi);
    app.use(error)
   // app.use(error);
    
}

