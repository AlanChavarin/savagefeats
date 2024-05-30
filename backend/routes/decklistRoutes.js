const express = require('express')
const router = express.Router()
const {getDecklist, getDecklists, getDecklistsByEvent, postDecklist, updateDecklist, deleteDecklist} = require('../controllers/decklistController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getDecklists)

router.get('/byevent/:event', getDecklistsByEvent)

router.get('/:deckId', getDecklist)

router.post('/', protect, protectModerator, postDecklist)

router.put('/:deckid', protect, protectModerator, updateDecklist)

router.delete('/:deckid', protect, protectModerator, deleteDecklist)

module.exports = router