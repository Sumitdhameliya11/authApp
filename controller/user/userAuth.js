const { errorResponse } = require("../../helper/errorResponse");
const { successResponse } = require("../../helper/successResponse");
const {
  userValidation,
  userSigninValidation,
  userForgetPassword,
  userResetPasswordValidation,
} = require("../../helper/user.validation");
const User = require("../../model/user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const { SendEmail } = require("../../helper/sendEmail");

//registration
const userRegistration = async (req, res) => {
  try {
    const { error, value } = userValidation.validate(req.body);
    if (error) {
      return errorResponse(res, 400, error.details[0].message, "");
    }
    //encrypt password create
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    if (!hashPassword) {
      return errorResponse(res, 400, "hash password error");
    }
    //check user is register or not
    const userExist = await User.findOne({
      $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
    });
    if (userExist) {
      return errorResponse(res, 400, "user already Exist");
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      mobileNumber: req.body.mobileNumber,
      otp: req.body.otp || null,
    });
    user.save();
    return successResponse(res, 200, {}, "Registration successfully");
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error);
  }
};

//login
const userSignIn = async (req, res) => {
  try {
    const { error } = userSigninValidation.validate(req.body);

    if (error) {
      return errorResponse(res, 400, error.details[0].message, "");
    }

    const userData = await User.findOne({
      email: req.body.email,
    });
    if (!userData) {
      return errorResponse(res, 400, "User Not Found", "");
    } else {
      const IsPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!IsPassword) {
        return errorResponse(res, 400, "Enter a correct Password", "");
      }

      const Token = jwt.sign(
        { userId: userData._Id, email: userData.email },
        config.jwtKey
      );
      const userResponse = {
        id: userData._id,
        email: userData.email,
        Token: Token,
      };
      return successResponse(res, 200, userResponse, "SignIn Successfully");
    }
  } catch (error) {
    return errorResponse(res, 500, " Internal Server error", error.message);
  }
};
//forgotPassword
const forgetPassword = async (req, res) => {
  try {
    const { error } = userForgetPassword.validate(req.query);
    if (error) {
      return errorResponse(res, 400, error.details[0].message, "");
    }

    const userData = await User.findOne({
      email: req.query.email,
    });
    if (!userData) {
      return errorResponse(res, 400, "User Not Found", "");
    } else {
      // random Otp generate
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }
      const isUpdate = await User.findByIdAndUpdate(
        userData._id,
        { otp: randomString },
        { new: true }
      );
      const message = `<div class="container">
        <h2>Dear ${userData.username},</h2>
        <p>We received a request to verify your account. To complete the verification process, please use the One-Time Password (OTP) provided below:</p>
        
        <p>Your OTP is: <b>${randomString}</b></p>
        
        <p>This OTP is valid for the next <strong>[X minutes]</strong>. Please do not share this code with anyone, as it is meant for your use only.</p>
        
        <p>If you did not request this OTP, please ignore this email. Your account remains secure.</p>
        
        <p>Thank you for using our service!</p>
        
        <div class="footer">
            Best regards,<br>
            authAPP
        </div>
    </div>
`;

      const isMail = SendEmail(
        req.query.email,
        message,
        " Your One-Time Password (OTP) for Verification"
      );
      if (!isMail) {
        return errorResponse(res, 400, "opt can't send");
      }
      return successResponse(res, 200, "", "otp send successfully");
    }
  } catch (error) {
    return errorResponse(res, 500, " Internal Server error", error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = userResetPasswordValidation.validate(req.body);
    if (error) {
      return errorResponse(res, 400, error.details[0].message, "");
    }
    const userData = await User.findOne({ otp: req.body.otp });
    if (!userData) {
      return errorResponse(res, 400, "user not found", "");
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      await User.findByIdAndUpdate(
        userData._id,
        { password: hashPassword },
        { new: true }
      );
      return successResponse(res, 200, "", "password reset successfully");
    }
  } catch (error) {
    return errorResponse(res, 500, " Internal Server error", error.message);
  }
};

module.exports = {
  userRegistration,
  userSignIn,
  forgetPassword,
  resetPassword,
};
