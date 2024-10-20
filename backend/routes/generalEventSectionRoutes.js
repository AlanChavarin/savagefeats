const express = require('express')
const router = express.Router()
const {getGeneralEventSectionsByEventId, getGeneralEventSection, postGeneralEventSection, deleteGeneralEventSection, updateGeneralEventSection, getAllSectionImageLinks} = require('../controllers/generalEventSectionsController')
const {protect, protectModerator} = require('../middleware/authMiddleware')
const multer = require('multer')

const storage = new multer.memoryStorage()
const upload = multer({storage, limits: {fileSize: 4000000}})

//router.get('/:eventId', getGeneralEventSectionsByEventId)

router.get('/getallsectionimagelinks', getAllSectionImageLinks)

router.get('/:generalEventSectionId', getGeneralEventSection)

router.post('/', protect, protectModerator, upload.fields([{name: 'image'}]), postGeneralEventSection)

router.put('/:generalEventSectionId', protect, protectModerator, upload.fields([{name: 'image'}]), updateGeneralEventSection)

router.delete('/:generalEventSectionId', protect, protectModerator, deleteGeneralEventSection)



module.exports = router 