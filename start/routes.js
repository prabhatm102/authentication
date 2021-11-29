const users = require("../routes/user");
const express = require("express"); 
const pug = require("pug");

module.exports = function(app){
    app.use(express.json(true));    
    app.use("/api/users",users);
    app.get("/",(req,res)=>{
       res.render("guest.pug");
    });
   // app.use(error);
    
}

