const express = require('express')
const router = express.Router()
const {getDecklist, getDecklists, postDecklist, updateDecklist, deleteDecklist} = require('../controllers/decklistController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/', getDecklists)

router.get('/:decklistId', getDecklist)

router.post('/', protect, protectModerator, postDecklist)

router.put('/:decklistid', protect, protectModerator, updateDecklist)

router.delete('/:decklistid', protect, protectModerator, deleteDecklist)

module.exports = router