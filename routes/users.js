const express = require('express')
const router = express.Router()
const { login, register, current, removeUser } = require('../controllers/users')
const { auth } = require('../middleware/auth')

/* /api/users/login */
router.post('/login', login)
/* /api/users/register */
router.post('/register', register)
/* /api/users/current */
router.get('/current', auth, current)
/* /api/users/remove/:id */
router.post('/remove/:id', auth, removeUser)

module.exports = router
