const express = require("express");
const {
  userRegistration,
  userSignIn,
  forgetPassword,
  resetPassword,
} = require("../../controller/user/userAuth");
const router = express.Router();

//signup
router.post("/signup", userRegistration);
router.post("/signin", userSignIn);
router.get("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
