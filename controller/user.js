const { User } = require("../model/user");

const addUser = async(req,res,next)=>{
    const email = await User.findOne({email:req.body.email});
      if(email) return res.status(403).send("Email Already Exists!");
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
      await user.save();
      const token =await new User({}).genrateToken();
      res.header('x-auth-token',token).send(user);
};

const updateUser = async(req,res,next)=>{

};

module.exports = {
    addUser:addUser
}