const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req,res,next)=>{
   const token = req.header('x-auth-token') || req.body.authToken || req.cookies.authToken;
    if(!token)
        return res.status(401).render("signin.pug",{msg:"Access Denied! No Token Provided"});
    try{
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).render("signin.pug",{msg:"Invalid Token"});
    }
}