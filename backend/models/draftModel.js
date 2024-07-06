const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const { Schema } = mongoose
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'Mixed']


const draftSchema = mongoose.Schema({
    twitch: Boolean,
    twitchTimeStamp: String,
    link: {type: String, required: true}, 
    timeStamp: {type: Number},
    top8: {type: Boolean, required: true},
    swissRound: Number,
    relatedMatches: [Schema.Types.Mixed],
    playerName: String,

    event: {
        _id: {
            type: ObjectId,
            required: false
        },
        name: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false
        },
        format: {
            type: [String],
            required: true,
            enum: formats
        },
        official: {
            type: Boolean,
            required: false,
        },
        startDate: Date,
        tier: Number,
        streamed: Boolean
    }

})

module.exports = mongoose.model('Draft', draftSchema)