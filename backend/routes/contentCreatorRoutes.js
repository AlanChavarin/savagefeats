const express = require('express')
const router = express.Router()
const {getContentCreators, getContentCreator, postContentCreator, updateContentCreator, deleteContentCreator} = require('../controllers/nameController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getContentCreators)

router.get('/:contentcreatorid', getContentCreator)

router.post('/', protect, protectModerator, postContentCreator)

router.put('/', protect, protectModerator, updateContentCreator)

router.delete('/', protect, protectModerator, deleteContentCreator)

//insert route here for latest assorted content (needs to be figured out)

module.exports = router