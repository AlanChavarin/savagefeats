const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'Mixed']
const ObjectId = require('mongodb').ObjectId
const Hero = require('../models/heroModel')

const decklistSchema = mongoose.Schema({
    playerName: String,
    decklistLink: String, 
    placement: Number,
    hero: {
        type: String, 
        required: true, 
        validate: v => heroEnum(v)
    },

    //sometimes placement details for decklists/players will only be a range, for example 9th-16th, thus if of placementRangeEnding is defined, the placement range will be starting from the value in placement - placementRangeEnding.
    //If placementRangeEnding is left empty, the value in placement will be treated as the accurate placement value for this decklist
    placementRangeEnding: Number,
    format: {
        type: String,
        required: true,
        enum: formats
    },

    event: {
        _id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
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
            required: false,
        },
        startDate: Date,
        tier: Number,
    }

})

const heroEnum = async (v) => {
    return !!await Hero.findOne({name: v})
}

decklistSchema.index({
    playerName: 'text',
    hero: 'text',
    format: 'text',
    'event.name': 'text',
    'event.location': 'text',
    'event.format': 'text',
})

module.exports = mongoose.model('Decklist', decklistSchema)