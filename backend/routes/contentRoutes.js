const express = require('express')
const router = express.Router()
const {getContentByContentCreator, updateContentByContentCreator} = require('../controllers/nameController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/:contentCreatorid', getContentByContentCreator)

router.put('/', protect, protectModerator, updateContentByContentCreator)

//insert route here for latest assorted content (needs to be figured out)

module.exports = router