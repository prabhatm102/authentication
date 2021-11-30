const axios  = require("axios");

const addUser = (req,res,next)=>{   
  res.send(req.body);
      //  axios.post('http://localhost:3000/api/users',{name:req.body.name,email:req.body.email,password:req.body.password})
      //    .then(res=>console.log(res))
       //   .catch(ex=>{console.log(ex.message);res.send(ex)});
          
}
const authUser = (req,res,next)=>{
    
}

module.exports = {
    addUser:addUser,
    authUser:authUser
}