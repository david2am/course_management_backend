const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. Not token provided.');

    try {
        const payload = jwt.verify(token, process.env.course_jwtPrivateKey);
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;