const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const contentTypes = ['decktech', 'portfolio']

const contentSchema = mongoose.Schema({
    videoid: String,
    publishedAt: Date,
    parentContentCreatorYoutubeChannelid: String,
    parentContentCreatorid: ObjectId,
    title: String,
    description: String,
    channelTitle: String,
    liveBroadcastContent: String,
    etag: String,
    type: {
        type: String,
        enum: contentTypes
    },
    relatedEventid: [ObjectId],
    relatedMatchid: [ObjectId],
    relatedDecklistid: ObjectId,
})

contentSchema.index({
    videoId: 'text',
    channelId: 'text',
    title: 'text',
    description: 'text',
    channelTitle: 'text',
})

module.exports = mongoose.model('Content', contentSchema)