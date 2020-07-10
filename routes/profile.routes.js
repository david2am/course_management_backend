const authCheck = require('../middleware/authCheck.middleware')
const profile = require('../controllers/profile.controller')

const router = require('express').Router();

router.get('/', authCheck, profile);

module.exports = router;