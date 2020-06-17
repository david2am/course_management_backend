const auth = require('../middleware/auth.middleware');
const { me, register, login } = require('../controllers/users.controller');

const router = require('express').Router();

router.get('/me', [auth], me);
router.post('/register', register);
router.post('/login', login);

module.exports = router;