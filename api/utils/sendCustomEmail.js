const nodemailer = require('nodemailer');

const sendCustomEmail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
      host: 'mail.quickspacegh.com',
      port: 465, // Use 587 for TLS if not using SSL
      secure: true, // Use true for 465 and false for 587
      auth: {
        user: process.env.APP_EMAIL, 
        pass:  process.env.APP_PASSWORD
      },
    });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info);
        }
      });
}

module.exports = {sendCustomEmail}