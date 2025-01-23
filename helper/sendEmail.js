const nodemailer = require("nodemailer");
const config = require("../config/config");

//sending email controller
const SendEmail = async (email, message, sub) => {
  try {
    //create test accout
    let testAccount = await nodemailer.createTestAccount();
    //create transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.emailUserName,
        pass: config.emailPassword,
      },
    });

    //sending the mail with defined object
    const info = await transporter.sendMail({
      from: '"Sumit Dhameliya 👻" <sumitdhameliya002@gmail.com>', // sender address
      to: email, // list of receivers
      subject: sub, // Subject line
      // text: message, // plain text body
      html: `${message}`, // html body
    });
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  SendEmail,
};
