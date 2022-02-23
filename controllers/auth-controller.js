const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            res.status(400).json({ msg: 'Phone Field is required' })
        }

        const otp = await otpService.generateOtp()

        //hash
        const ttl = 1000 * 60 * 2  // 2 Minute expiry time
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = hashService.hashOtp(data)

        //sendOtp
        try {
            await otpService.sendBySms(phone, otp);
            res.status(200).json({
                hash: `${hash}.${expires}`,
                phone
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'message sending failed' })
        }
    }

    verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !hash || !phone) {
            res.status(400).json({ msg: 'All Fields are required' })
        }

        const [hashedOtp, expires] = hash.split('.');

        if (Date.now() > expires) {
            res.status(400).json({ msg: 'OTP Expired' })
        }

        const data = `${phone}.${otp}.${expires}`
        const isValid = otpService.verifyOtp(hashedOtp, data)

        if (!isValid) {
            res.status(400).json({ msg: 'Invalid OTP' })
        }

        let user;
        let accessToken;
        let refreshToken;
    }
}

module.exports = new AuthController();