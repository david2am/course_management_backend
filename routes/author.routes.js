const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

const {get, post, getById, putById, deleteById } = require('../controllers/author.controller')


router.get('/', get)
router.post('/', [auth], post)
router.get('/:id', getById)
router.put('/:id', [auth], putById)
router.delete('/:id', [auth, admin], deleteById)


module.exports = router;