const jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '12h'});
}

function verifyToken(token){
    try{
        return jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
    } catch (error){
        return null;
    }
}

// token null = can't split = error
// token error = not valid = error
// happy = correct format and string = user

module.exports = {
    generateToken,
    verifyToken
}