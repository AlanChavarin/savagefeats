const express = require('express')
const router = express.Router()
const {getAllContent, getContent, getContentByContentCreator, updateContentRelatedData, updateContentByContentCreator, postContent, deleteContent, latestInFleshAndBlood, postPortfolioContent, getPortfolioContent, deleteContentVideoId, updateContentForAllCreators, oneTimeUpdateForThumbnails, getFeaturedContentCreatorsAndTheirLatest8Videos} = require('../controllers/contentController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/getfeaturedcontentcreatorsandtheirlatest8videos', getFeaturedContentCreatorsAndTheirLatest8Videos)

router.put('/onetimeupdateforthumbnails', protect, protectModerator, oneTimeUpdateForThumbnails)

router.get('/latestinfleshandblood', latestInFleshAndBlood)

router.get('/portfoliocontent', getPortfolioContent)

router.get('/', getAllContent)

router.get('/:contentid', getContent)

router.get('/bycontentcreator/:contentcreatorid', getContentByContentCreator)

router.put('/updatecontentforallcreators/', protect, protectModerator, updateContentForAllCreators)

router.put('/updatebycontentcreator/:contentcreatorid', protect, protectModerator, updateContentByContentCreator)

router.put('/:contentid', protect, protectModerator, updateContentRelatedData)

router.post('/portfoliocontent', protect, protectModerator, postPortfolioContent)

router.post('/', protect, protectModerator, postContent)

router.delete('/videoid/:videoid', protect, protectModerator, deleteContentVideoId)

router.delete('/:contentid', protect, protectModerator, deleteContent)


module.exports = router