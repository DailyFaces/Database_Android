const jwt = require("jsonwebtoken");
const config = require('../config');

let auth_user = (req, res) => {
    let token = req.headers.token
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                res.status(200).json({
                    message: "Auth token is valid",
                    decoded: decoded
                });
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

module.exports = { auth_user }