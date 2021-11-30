const Joi = require("joi");
module.exports.validate = (req,res,next)=>{
    const schema = Joi.object({
        name:Joi.string().required().min(3).max(255),
        email:Joi.string().required(),
        password:Joi.string().required().min(8)
    });
      const { error } = schema.validate(req.body);
        if(error) return res.status(400).render("signup.pug",{msg:error.details[0].message});
      next();  
}