const express = require('express')
const router = express.Router()
const {registerUser, resendVerificationEmail, loginUser, getMe, verifyUser, getUsers, changePrivileges, forgotUserPassword, resetUserPassword, generateSignUpLink} = require('../controllers/userController')
const {protect, protectModerator, protectAdmin} = require('../middleware/authMiddleware')

router.get('/', protect, getUsers)

router.get('/generatesignuplink', protect, protectAdmin, generateSignUpLink)

router.post('/register', registerUser)

router.post('/resendverification', resendVerificationEmail)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

router.put('/verify', verifyUser)

router.put('/changeprivileges', protect, protectModerator, changePrivileges)

router.post('/forgotuserpassword', forgotUserPassword)

router.put('/resetuserpassword', resetUserPassword)

module.exports = router