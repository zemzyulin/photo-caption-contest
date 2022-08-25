const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log(req.headers['authorization']);
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. Token not provided.'})
    }
    try {
        req.user = jwt.verify(token, config.privatekey);
        //console.log(req.user);
        next();
    } catch(error) {
        res.status(400).send('Invalid token.');
    }
}