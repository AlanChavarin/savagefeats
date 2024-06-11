const express = require('express')
const router = express.Router()
const {getDecklist, getDecklists, getDecklistsByEvent, postDecklist, updateDecklist, deleteDecklist, replaceDecklistLinksWithDecklistDocumentIds} = require('../controllers/decklistController')
const {protect, protectModerator} = require('../middleware/authMiddleware')

router.get('/replacedecklistlinkswithdecklistdocumentids', protect, protectModerator, replaceDecklistLinksWithDecklistDocumentIds)

router.get('/', getDecklists)

router.get('/byevent/:event', getDecklistsByEvent)

router.get('/:decklistid', getDecklist)

router.post('/', protect, protectModerator, postDecklist)

router.put('/:decklistid', protect, protectModerator, updateDecklist)

router.delete('/:decklistid', protect, protectModerator, deleteDecklist)


module.exports = router