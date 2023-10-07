require('dotenv').config({ path: 'config.env' })
const jwt = require('jsonwebtoken')

exports.verificarToken = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(400).json({ msg: 'Invalid token 1' })
    }

    token = token.split(' ')

    jwt.verify(token[1], process.env.SECRET_KEY_JWT, (error, decode) => {

        if (error) {
            return res.status(403).json({ msg: 'Invalid token 2' })
        }

        req.userData = decode
        next()

    })

}
