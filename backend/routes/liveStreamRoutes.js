const express = require('express')
const router = express.Router()
const {getLiveStreams, postLiveStream, deleteLiveStream} = require('../controllers/liveStreamController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getLiveStreams)

router.post('', protect, protectModerator, postLiveStream)

router.delete('/:link', protect, protectModerator, deleteLiveStream)


module.exports = router