const express = require('express')
const router = express.Router()
const {getAllContent, getContent, getContentByContentCreator, updateContentRelatedData, updateContentByContentCreator, postContent, deleteContent, latestInFleshAndBlood} = require('../controllers/contentController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/latestinfleshandblood', latestInFleshAndBlood)

router.get('/', getAllContent)

router.get('/:contentid', getContent)

router.get('/bycontentcreator/:contentcreatorid', getContentByContentCreator)

router.put('/updatebycontentcreator/:contentcreatorid', protect, protectModerator, updateContentByContentCreator)

router.put('/:contentid', protect, protectModerator, updateContentRelatedData)

router.post('/', protect, protectModerator, postContent)

router.delete('/:contentid', protect, protectModerator, deleteContent)

//insert route here for latest assorted content (needs to be figured out)

module.exports = router