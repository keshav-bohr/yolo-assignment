const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const { JWT_SECRET: secretKey } = process.env

const dbStoredCredentials = {
    id: 1,
    username: 'yolo',
    password: '$2b$10$RaK8F7biNqux0yJ0oXCzXeIx8e5Y8IVt8RAzxe2SrhhdUhcz43zaK'
}

async function login(req, res, next) {
    try {
        const bodySchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required().min(6).max(20).lowercase()
        })
        await bodySchema.validateAsync(req.body)
        const result = await bcrypt.compare(req.body.password, dbStoredCredentials.password)
        if(!result || req.body.username !== dbStoredCredentials.username){
            return res.json({
                success: false,
                message: 'Incorrect credentials'
            })
        }
        delete dbStoredCredentials.password
        const jwtToken = jwt.sign(dbStoredCredentials, secretKey, { expiresIn: '1h' })
        return res.json({
            success: true,
            jwtToken
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
}