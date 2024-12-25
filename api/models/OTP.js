const mongoose = require('mongoose')

const OTPSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      require: true
    },

    code: {
      type: String,
      required: true
    }
    
  },

  {
    timestamps: true
  }
)

const OTP = mongoose.model('OTP', OTPSchema)

module.exports = OTP
