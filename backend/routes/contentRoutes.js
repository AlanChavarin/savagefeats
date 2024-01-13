const express = require('express')
const router = express.Router()
const {getAllContent, getContentByContentCreator, updateContentByContentCreator, postContent, deleteContent} = require('../controllers/contentController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getAllContent)

router.get('/:contentCreatorid', getContentByContentCreator)

router.put('/:contentCreatorid', protect, protectModerator, updateContentByContentCreator)

router.post('/', protect, protectModerator, postContent)

router.delete('/:contentid', protect, protectModerator, deleteContent)

//insert route here for latest assorted content (needs to be figured out)

module.exports = router