const joi = require("joi");

const expenseValidationSchema = joi.object().keys({
  amount: joi.number().required(),
  description: joi.string().required(),
});

const expenseValidation = (req, res, next) => {
  const { error } = expenseValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const earningValidationSchema = joi.object().keys({
  amount: joi.number().required(),
  description: joi.string().required(),
});

const earningValidation = (req, res, next) => {
  const { error } = earningValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  expenseValidation,
  earningValidation,
};
