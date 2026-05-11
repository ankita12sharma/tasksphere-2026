const Joi = require("joi");

const AuthValidation = async (req, res, next) => {
  try {
    const UserSchema = Joi.object({
      name: Joi.String().min(4).max(100).required(),
      email: Joi.string()
        .email()
        .pattern(/^(?=.*[0-9])(?=.*[._%+-]).+@gmail\.com$/)
        .required(),
      password: Joi.String().required().min(6).max(100),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    const error = await UserSchema.validate({ name, email, password });
    if (error) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: error.details[0].message,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Validation error",
    });
  }
};
module.exports = { AuthValidation };
