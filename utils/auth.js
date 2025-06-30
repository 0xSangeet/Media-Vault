const JWT = require("jsonwebtoken");

const secretKey = "$!@#vvv";

function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role
    }
    return JWT.sign(payload, secretKey);
}

function validateToken(token) {
    const payload = JWT.verify(token, secretKey);
    return payload;
}

module.exports = {
    generateToken,
    validateToken
}