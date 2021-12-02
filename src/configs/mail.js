const nodemailer = require("nodemailer")


var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, 
    auth: {
      user: "281c2c743f3df0",
      pass: "e68de580c584a5",
    },
  });


  module.exports = transporter