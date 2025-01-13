const joi = require("joi");

const userRegisterSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ tlds: { allow: false} })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .max(10)
    .required(),
});

const registerUser = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const userLoginSchema = joi.object().keys({
  email: joi
    .string()
    .email({ tlds: { allow: false} })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .max(10)
    .required(),
});

const loginUser = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  registerUser,
  loginUser,
};
