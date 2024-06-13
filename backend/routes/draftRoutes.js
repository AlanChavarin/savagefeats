const express = require('express')
const router = express.Router()
const {getDrafts,
    getDraftsByEvent,
    getDraft,
    postDraft,
    updateDraft,
    deleteDraft} = require('../controllers/draftController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getDrafts)

router.get('/:draftid', getDraft)

router.get('/byevent/:event', getDraftsByEvent)

router.post('/', protect, protectModerator, postDraft)

router.put('/:draftid', protect, protectModerator, updateDraft)

router.delete('/:draftid', protect, protectModerator, deleteDraft)

module.exports = router