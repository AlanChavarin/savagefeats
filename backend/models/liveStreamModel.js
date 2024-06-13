const mongoose = require('mongoose')

const liveStreamSchema = mongoose.Schema({
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LiveStream', liveStreamSchema)