const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, verifyUser, getUsers, changePrivileges, generateSignUpLink} = require('../controllers/userController')
const {protect, protectModerator, protectAdmin} = require('../middleware/authMiddleware')

router.get('/', protect, getUsers)

router.get('/generatesignuplink', protect, protectAdmin, generateSignUpLink)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.put('/verify/:userid', protect, protectAdmin, verifyUser)

router.put('/changeprivileges/:userid', protect, protectModerator, changePrivileges)

module.exports = router