const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. Token not provided.' })
    }
    try {
        req.user = jwt.verify(token.slice(7), config.privatekey);
        next();
    } catch(error) {
        res.status(400).send('Invalid token.');
    }
}