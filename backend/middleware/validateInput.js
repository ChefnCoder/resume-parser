const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(6).max(30),
});

const resumeExtractSchema = Joi.object({
  url: Joi.string().uri().required().regex(/\.pdf$/)
});

const resumeSearchSchema = Joi.object({
  name: Joi.string().required().min(2).max(50) 
});

const validateInput = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateInput, loginSchema, resumeExtractSchema, resumeSearchSchema };
