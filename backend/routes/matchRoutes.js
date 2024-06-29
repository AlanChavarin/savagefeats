const express = require('express')
const router = express.Router()
//const asyncHandler = require('express-async-handler')
const {getMatch, getMatches, postMatch, updateMatch, deleteMatch, getMatchesByEvent, getNameHeroPairsbyEvent} = require('../controllers/matchController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

// const recycleBin = asyncHandler(async (req, res, next) => {
//     req.recyclebin = true
//     next()
// })

// router.get('/recyclebin', protect, protectModerator, recycleBin, getMatches)

// router.get('/recyclebin/:id', protect, protectModerator, recycleBin, getMatch)

// router.put('/recyclebin/:id', protect, protectModerator, restoreMatch)

router.get('/getnameheropairsbyevent/', getNameHeroPairsbyEvent)

router.get('/', getMatches)

router.get('/:id', getMatch)

router.get('/byevent/:event', getMatchesByEvent)

router.post('/', protect, protectModerator, postMatch)

router.put('/:matchid', protect, protectModerator, updateMatch)

router.delete('/:id', protect, protectModerator, deleteMatch)

module.exports = router