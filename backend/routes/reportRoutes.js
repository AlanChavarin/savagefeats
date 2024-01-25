const express = require('express')
const router = express.Router()
const {getReport, getReports, postReport, updateReport} = require('../controllers/reportController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getReports)

router.get('/:reportid', getReport)

//this will require a captcha system
router.post('/', postReport)

router.put('/:reportid', protect, protectModerator, updateReport)

module.exports = router