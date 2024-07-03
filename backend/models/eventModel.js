const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'Mixed']
const ObjectId = require('mongodb').ObjectId

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    format: {
        type: [String],
        required: true,
        enum: formats
    },
    official: {
        type: Boolean,
        required: true,
    },
    tier: Number,
    //for further specification of a format, for example if the format is mixed, you may describe it as "Classic Constructed + EVO Draft"
    formatDescription: String,
    venue: String,
    coincidingEvents: [ObjectId],
    officialDetails: String,
    signUpLink: String,
    liveStream: String,
    twitch: Boolean,
    startDate: Date,
    endDate: Date,
    //for tournaments that don't follow a typical tournament structure, for example leagues that are 1 game a week
    notATypicalTournamentStructure: Boolean,
    dayRoundArr: [Number],
    top8Day: Boolean,
    backgroundPosition: Number,
    deleted: Boolean,
    happeningNow: Boolean,
    streamed: {
        type: Boolean,
        required: true
    },
    todaysDate: Date,
    emptyEvent: {
        type: Boolean,
        default: true
    },

    //description: String,
    image: String,
    bigImage: String,
})

eventSchema.index({
    name: 'text',
    location: 'text',
    format: 'text',
    description: 'text',
    formatDescription: 'text',
    
})

module.exports = mongoose.model('Event', eventSchema)