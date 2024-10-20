const mongoose = require('mongoose')

const generalEventSectionSchema = new mongoose.Schema({
    header: {type: String, required: true},
    image: {type: String, required: true},
    eventId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

module.exports = mongoose.model('GeneralEventSection', generalEventSectionSchema)

