const express = require('express')
const router = express.Router()
const {getNames, postName, deleteName, getNameLinkPairsbyEvent} = require('../controllers/nameController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/namelinkpairsbyEvent/', getNameLinkPairsbyEvent)

router.get('/', getNames)

router.post('/:name', protect, protectModerator, postName)

router.delete('/:name', protect, protectModerator, deleteName)

//router.get('/doesnameexist/:name', protect, protectHelper, doesNameExist)

module.exports = router