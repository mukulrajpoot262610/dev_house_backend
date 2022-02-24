const jwt = require('jsonwebtoken')
const refreshModal = require('../models/refresh-modal')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModal.create({
                token,
                userId
            })
        } catch (err) {
            console.log(err)
        }
    }

    verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
    }
}

module.exports = new TokenService()