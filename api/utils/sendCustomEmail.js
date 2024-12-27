//import nodemailer from "nodemailer"
const nodemailer = require('nodemailer');

const sendCustomEmail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      transporter.sendMail(mailOptions);
}

module.exports = {sendCustomEmail}