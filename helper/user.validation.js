const joi = require("joi");

const userValidation = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi
    .string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) // Only Gmail addresses allowed
    .required()
    .messages({
      "string.pattern.base": "Only Gmail addresses are allowed.", // Custom error message for invalid email
    }),
  password: joi
    .string()
    .min(8)
    .max(50)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    }),
  mobileNumber: joi
    .string()
    .pattern(/^[0-9]{10}$/) // 10-digit mobile number
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be a 10-digit number.",
    }),
});

const userSigninValidation = joi.object({
  email: joi
    .string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) // Only Gmail addresses allowed
    .required()
    .messages({
      "string.pattern.base": "Only Gmail addresses are allowed.", // Custom error message for invalid email
    }),
  password: joi
    .string()
    .min(8)
    .max(50)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    }),
});

const userForgetPassword = joi.object({
  email: joi
    .string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) // Only Gmail addresses allowed
    .required()
    .messages({
      "string.pattern.base": "Only Gmail addresses are allowed.", // Custom error message for invalid email
    }),
});

const userResetPasswordValidation = joi.object({
  otp: joi
    .string()
    .min(6)
    .max(6)
    .required()
    .messages({ "string.pattern.base": "otp length is six" }),
  password: joi
    .string()
    .min(8)
    .max(50)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    }),
});

module.exports = {
  userValidation,
  userSigninValidation,
  userForgetPassword,
  userResetPasswordValidation,
};
