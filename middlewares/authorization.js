const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const authorization = () => {
    return (req, res, next) => {
        const code = req.header('code');
        const decoded = jwt_decode(code);
        const jwt_key = '123qwe890'
        const verified = jwt.verify(code, jwt_key)
        next()
    }
}
module.exports = { authorization }
