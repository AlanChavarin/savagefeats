const mongoose = require('mongoose')

const contentCreatorSchema = mongoose.Schema({
    channelid: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        unique: true
    },
    customUrl: {
        type: String,
        unique: true
    },
    description: String,
    publishedAt: Date,
    profilePictureDefault: String,
    profilePictureMedium: String,
    profilePictureHigh: String,
    etag: String,
})

contentCreatorSchema.index({
    title: 'text',
    description: 'text',
})

module.exports = mongoose.model('ContentCreator', contentCreatorSchema)