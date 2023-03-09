const jwt = require('jsonwebtoken')
require('dotenv').config()

const createJWT = (data) => {
    return jwt.sign(data, process.env.JWT_TOKEN_SECRATE, { expiresIn: "3d"})
}



module.exports = {createJWT};