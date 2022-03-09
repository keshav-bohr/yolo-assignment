const router = require('express').Router()
const { helloWorld } = require('./helloWorld')
const { login } = require('./login')


router.get('/hello-world', helloWorld)
router.post('/login', login)

module.exports = router