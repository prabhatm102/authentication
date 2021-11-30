const Joi = require("joi");
module.exports.validateLogin = (req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required().min(8)
    });
      const { error } = schema.validate(req.body);
        if(error) return res.status(400).render("signin.pug",{msg:error.details[0].message});
      next();  
}