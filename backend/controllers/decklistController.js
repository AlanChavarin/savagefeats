const asyncHandler = require('express-async-handler')
const {Decklist} = require('../models/decklistModel')
const Hero = require('../models/heroModel')
const Event = require('../models/eventModel')
const Name = require('../models/nameModel')
const Match = require('../models/matchModel')
const wordWrapper = require('../helpers/wordWrapper')
const ObjectId = require('mongodb').ObjectId

const getDecklists = asyncHandler(async (req, res) => {
    let skip, limit, find, order
    if(!req.query?.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query?.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    order = parseInt(req.query?.order)
    !(order === 1 || order === -1) && (order = -1) 

    find = {}

    //text search filter
    if(req.query?.text){
        find["$text"] = {"$search": wordWrapper(req.query.text)}
    }

    //format filter
    if(req.query?.format){
        find["format"] = req.query.format
    }

    //official filter
    if(req.query?.official){
        find["event.official"] = req.query.official === 'true'
    }

    //tier filter
    if(req.query?.tier){
        find["event.tier"] = req.query.tier
    }

    //hero filter
    if(req.query?.hero){
        if(!await Hero.findOne({name: req.query.hero})){
            res.status(400)
            throw new Error('that hero doesnt exist')
        }
        find["hero"] = req.query.hero
    }

    //date range filter

    const date1 = new Date(req.query?.startDate)
    const date2 = new Date(req.query?.endDate)

    if(req.query?.startDate && req.query?.endDate){
        find["event.startDate"] = {"$gte": date1, "$lte": date2}
    } else if(req.query?.startDate){
        find["event.startDate"] = {"$gte": date1}
    } else if(req.query?.endDate){
        find["event.startDate"] = {"$lte": date2}
    }

    const pipeline = [
        {"$match": find},
        {"$facet": {
            "decklists": [
                { "$sort": {"event.startDate": order}},
                { "$skip": skip },
                { "$limit": limit },
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const decklistsQuery = await Decklist.aggregate(pipeline)

    const data = {
        "decklists": decklistsQuery[0].decklists,
        "count": decklistsQuery[0].count[0]?.count ? decklistsQuery[0].count[0]?.count : 0
    }


    res.status(200)
    res.json(data)
})

const getDecklistsByEvent = asyncHandler(async (req, res) => {
    let decklists
    if(ObjectId.isValid(req.params.event)){
        const doesEventExist = await Event.exists({'_id': new ObjectId(req.params.event)})
        if(!doesEventExist){
            res.status(400)
            throw new Error('event of that name or id not found')
        }

        decklists = await Decklist.find({'event._id': new ObjectId(req.params.event)}).sort({placement: 1})

    } else {
        const doesEventExist = await Event.exists({'name': req.params.event})
        if(!doesEventExist){
            res.status(400)
            throw new Error('event of that name or id not found')
        }

        decklists = await Decklist.find({'event.name': req.params.event}).sort({placement: 1})
    }
    res.status(200)
    res.json(decklists)
})

const getDecklist = asyncHandler(async (req, res) => {
    const decklist = await Decklist.findById(req.params.decklistId)
    if(!decklist){
        res.status(400)
        throw new Error('decklist not found')
    }
    res.status(200)
    res.json(decklist)
})

const postDecklist = asyncHandler(async (req, res) => {
    const {playerName, decklistLink, placement, placementRangeEnding, format, hero, event} = req.body

    let eventData
    if(ObjectId.isValid(event)){
        eventData = await Event.findOne({_id: event})
    } else {
        eventData = await Event.findOne({name: event})
    }
    
    if(!eventData){
        res.status(400)
        throw new Error('given event name or id not found')
    }

    const decklist = await Decklist.create({
        playerName,
        decklistLink,
        placement,
        placementRangeEnding,
        hero,
        format,
        event: eventData,
    })

    if(!await Name.exists({name: playerName})){Name.create({name: playerName})} 

    //replace decklist links with decklist object id
    //replaceDeckListLinks(req.body.decklistLink, req.body.format, Decklist._id)

    // player 1
    await Match.updateMany({
        'event._id': decklist.event._id,
        player1name: decklist.playerName,
        format: decklist.format,
    },
    {
        player1deck: decklist._id
    },
    {runValidators: true, new: true})

    // player 2
    await Match.updateMany({
        'event._id': decklist.event._id,
        player2name: decklist.playerName,
        format: decklist.format,
    },
    {
        player2deck: decklist._id
    },
    {runValidators: true, new: true})

    res.status(200)
    res.json(decklist)
})

const updateDecklist = asyncHandler(async (req, res) => {
    if(!Decklist.exists({_id: req.params.decklistid})){
        res.status(400)
        throw new Error('decklist with that id does not exist or has been deleted')
    }
    req.body.event = await Event.findOne({name: req.body.event})
    const decklist = await Decklist.findOneAndUpdate({_id: req.params.decklistid}, req.body, {runValidators: true, new: true})
    if(!await Name.exists({name: req.body.playerName})){Name.create({name: req.body.playerName})} 

    // player 1
    await Match.updateMany({
        'event._id': decklist._id,
        player1name: decklist.playerName,
        format: decklist.format,
    },
    {
        player1deck: decklist._id
    },
    {runValidators: true, new: true})

    // player 2
    await Match.updateMany({
        'event._id': decklist._id,
        player2name: decklist.playerName,
        format: decklist.format,
    },
    {
        player2deck: decklist._id
    },
    {runValidators: true, new: true})

    res.status(200)
    res.json(decklist)
})

const deleteDecklist = asyncHandler(async (req, res) => {
    const decklist = await Decklist.deleteOne({_id: req.params.decklistid})
    if(!decklist){
        res.status(400)
        throw new Error('given decklist doesnt exist')
    }
    res.status(200)
    res.json(decklist)
})

//internal use only

// const replaceDeckListLinks = async (decklistLink, format, decklistId) => {
//     const {decklistLink, format} = formData

//     if(decklistLink && decklistId && !ObjectId.isValid(decklistLink)){
//         // player1 side
//         await Match.updateMany({
//             'player1deck': decklistLink,
//             'format': format,
//         }, {'player1deck': decklistId}, 
//         {runValidators: true, new: true})

//         //player2 side
//         await Match.updateMany({
//             'player2deck': decklistLink,
//             'format': format,
//         }, {'player2deck': decklistId}, 
//         {runValidators: true, new: true})
//     }
// }

module.exports = {
    getDecklist,
    getDecklistsByEvent,
    getDecklists,
    postDecklist,
    updateDecklist,
    deleteDecklist,
    //internal use only, do not put in a route
}