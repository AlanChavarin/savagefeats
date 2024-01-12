const express = require('express')
const router = express.Router()
const {getUsers, postUser} = require('../controllers/userController')

router.get('/', getUsers)

router.post('/', postUser)

module.exports = router