const asyncHandler = require('express-async-handler')
const Name = require('../models/nameModel')
const Match = require('../models/matchModel')

const getNames = asyncHandler(async (req, res) => {
    const names = await Name.find({})
    res.status(200).json(names)
})

const getNameLinkPairsbyEvent = asyncHandler(async (req, res) => {
    const matches = await Match.find({'event.name': req.query.event, 'format': req.query.format, deleted: false})
    
    let pairs = {}
    matches.map(match => {
        if(match.player1deck){
            pairs[match.player1name] = match.player1deck
        }
        if(match.player2deck){
            pairs[match.player2name] = match.player2deck
        }
    })

    res.status(200)
    res.json(pairs)
})

const postName = asyncHandler(async (req, res) => {
    if(!req.params.name){
        res.status(400)
        throw new Error('name cannot be empty')
    }

    const name = await Name.create({
        name: req.params.name
    })
    res.status(200).json(name)
})

const deleteName = asyncHandler(async (req, res) => {
    const name = await Name.deleteOne({name: req.params.name})
    if(!name.deletedCount){
        res.status(400)
        throw new Error('That name does not exist.')
    }
    res.status(200).json({message: 'The name, ' + req.params.name + ', has been deleted'})
})

module.exports = {
    getNames, 
    postName, 
    deleteName,
    getNameLinkPairsbyEvent
}