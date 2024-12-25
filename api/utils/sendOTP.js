const mailer = require('nodemailer')

const sendOTP = (from, to, subject, otp) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  })

  const html = `<h3 style="font-family: Arial, sans-serif; margin-bottom: 15px; font-size: 18px;">
            Hi there from <span> <strong> Quickspace </strong> </span>,
            </h3>
            <p style="margin-bottom: 10px;">
            We heard you need to reset your password. No worries, it happens to the best of us!
            </p>
            <p style="margin-bottom: 10px;">
              Your OTP code to reset your password is ${otp}
            </p>
           <p>
            This code will expire soon, so don't wait too long!
            </p>
            `

  transporter.sendMail(
    {
      from,
      to,
      subject,
      html
    },

    (err, info) => {
      if (err) {
        console.log(`Failed to send OTP to ${to}`)
        console.log(err)
      } else {
        console.log(`OTP sent to ${to}`)
      }
    }
  )
}

module.exports = sendOTP
