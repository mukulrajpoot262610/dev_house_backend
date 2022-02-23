const crypto = require('crypto')
const hashService = require('./hash-service')

const smsSid = process.env.SMS_SID
const smsToken = process.env.SMS_TOKEN
const smsNumber = process.env.SMS_FROM_NUMBER

const twilio = require('twilio')(smsSid, smsToken, {
    lazyLoading: true
})

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999)
        return otp
    }

    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: smsNumber,
            body: `Your DevHouse OTP is ${otp}.`
        })
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp
    }
}

module.exports = new OtpService()