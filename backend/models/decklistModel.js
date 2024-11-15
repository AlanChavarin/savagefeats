const mongoose = require('mongoose')
const formats = ['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'Mixed']
const ObjectId = require('mongodb').ObjectId
const Hero = require('../models/heroModel')

const decklistSchema = mongoose.Schema({
    playerName: String,
    decklistLink: {
        type: String,
        unique: true
    }, 
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
        type: {
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
                required: false,
                enum: formats
            },
            official: {
                type: Boolean,
                required: false,
            },
            startDate: Date,
            tier: Number,
        },
        required: false
    },

    deckTech: String,
    date: Date

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

//decklist model
const Decklist = mongoose.model('Decklist', decklistSchema)

module.exports = {
    Decklist, //decklist model
    decklistSchema
}