const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const Match = require('../models/matchModel')
const wordWrapper = require('../helpers/wordWrapper')
const { Decklist } = require('../models/decklistModel')
const getTodaysDate = require('../helpers/getTodaysDate')
//const {postEventEdit} = require('./eventEditHistoryController')
const {handleImageFiles, handleImageDeletion} = require('../helpers/cloudinaryHelper')

const getEvent = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    let event = await Event.findOne({_id: req.params.eventid, deleted: req.recyclebin})
    if(!event){
        res.status(400)
        throw new Error('Event with that id not found')
    }

    const date = getTodaysDate()

    event.todaysDate = date

    res.status(200)
    res.json(event)
})

const getEventNames = asyncHandler(async (req, res) => {
    if(!req.recyclebin){req.recyclebin = false}
    const events = await Event.find({deleted: req.recyclebin}, {name: 1, _id: 0})
    let data = []

    events.map(event => {
        data.push(event.name)
    })

    res.status(200)
    res.json(data)
})

const getEvents = asyncHandler(async (req, res) => {
    var skip, limit, find, order
    if(!req.query?.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query?.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    order = parseInt(req.query?.order)
    !(order === 1 || order ===-1) && (order = -1)

    find = {}

    if(!req.recyclebin){
        find["deleted"] = false
    } else {
        find["deleted"] = true
    }

    if(req.query?.text){
        find["$text"] = {"$search": wordWrapper(req.query.text)}
    }

    if(req.query?.startDate && req.query?.endDate){
        const startDate = new Date(req.query.startDate)
        const endDate = new Date(req.query.endDate)
        find["startDate"] = {
            "$gte": startDate,
            "$lte": endDate,  
        }
    } else {
        if(req.query?.startDate){
            const date = new Date(req.query.startDate)
            find["startDate"] = {"$gte": date}
        }

        if(req.query?.endDate){
            const date = new Date(req.query.endDate)
            find["startDate"] = {"$lte": date}
        }
    }

    if(req.query?.format){
        find["format"] = req.query?.format
    }

    if(req.query?.official){
        find["official"] = req.query.official === 'true'
    }

    if(req.query?.streamed){
        find["streamed"] = req.query.streamed === 'true'
    }

    if(req.query?.emptyEvent === 'true'){
        find["emptyEvent"] = req.query.emptyEvent === 'true'
    }

    if(req.query?.emptyEvent === 'false'){
        find["emptyEvent"] = false
    }

    if(req.query?.tier){
        find["tier"] = Number(req.query.tier)
    }

    const pipeline = [
        {"$match": find},
        { "$facet": {
            "events": [
                {"$sort": {"startDate": order}},
                { "$skip": skip },
                { "$limit": limit },
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const eventsQuery = await Event.aggregate(pipeline)

    const date = getTodaysDate()

    let data = {
        "events": eventsQuery[0].events,
        "count": eventsQuery[0].count[0]?.count ? eventsQuery[0].count[0]?.count : 0
    }

    data.events.map(event => {
        event.todaysDate = date
    })

    res.status(200)
    res.json(data)
})

const getCurrentAndFutureEvents = asyncHandler(async (req, res) => {
    const date = getTodaysDate()
    const events = await Event.find({
        '$or': [
            {
                "startDate": {"$lte": date},
                "endDate": {"$gte": date}
            },
            {
                "startDate": {"$gte": date}
            }
        ]
    }).sort({startDate: -1})

    events.map(event => event.todaysDate = date)

    res.status(200)
    res.json(events)
})

const getLatestEvents = asyncHandler(async (req, res) => {
    const date = getTodaysDate()
    const events = await Event.find({
        '$or': [
            {
                "startDate": {"$lt": date},
                "endDate": {"$lt": date},
                "emptyEvent": false
            },
            {
                "startDate": {"$lt": date},
                "emptyEvent": false
            }
        ]
    }).sort({startDate: -1}).limit(9)

    events.map(event => event.todaysDate = date)

    res.status(200)
    res.json(events)
})

const postEvent = asyncHandler(async (req, res) => { 

    if(req.files?.image && req.files?.bigImage && req.body.resetImage !== 'true'){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image, req.files.bigImage)
        req.body.image = imageObject.image
        req.body.bigImage = imageObject.bigImage
    } else if(!req.body?.image?.startsWith('http') && !req.body?.bigImage?.startsWith('http')){
        delete req.body.image
        delete req.body.bigImage
    }

    if(!req.body.backgroundPosition){
        delete req.body.backgroundPosition
    }

    //needed to process arrays from req.body
    if(typeof(req.body.dayRoundArr)==='string'){
        //req.body.dayRoundArr = JSON.parse("[" + req.body.dayRoundArr + "]")
        req.body.dayRoundArr = req.body.dayRoundArr.split(',')
    }
    if(typeof(req.body.coincidingEvents)==='string'){
        //req.body.coincidingEvents = JSON.parse("[" + req.body.coincidingEvents + "]")
        req.body.coincidingEvents = req.body.coincidingEvents.split(',')
    }
    if(typeof(req.body.format)==='string'){
        //req.body.format = JSON.parse("[" + req.body.format + "]")
        req.body.format = req.body.format.split(',')
    }

    const event = await Event.create({
        name: req.body.name,
        location: req.body.location,
        format: req.body.format,
        formatDescription: req.body.formatDescription,
        tier: req.body.tier,
        venue: req.body.venue,
        coincidingEvents: req.body.coincidingEvents,
        official: req.body.official,
        officialDetails: req.body.officialDetails,
        signUpLink: req.body.signUpLink,
        liveStream: req.body.liveStream,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        top8Day: req.body.top8Day,
        dayRoundArr: req.body.dayRoundArr,
        description: req.body.description,
        notATypicalTournamentStructure: req.body.notATypicalTournamentStructure,
        twitch: req.body.twitch,
        image: req.body.image,
        bigImage: req.body.bigImage,
        backgroundPosition: req.body.backgroundPosition,
        deleted: false,
        //happeningNow,
        streamed: req.body.streamed ? true : false
    })

    //postEventEdit(event, req.user._id)
    res.status(200)
    res.json(event)

    // res.status(200)
    // res.json({message: 'wtf'})
})

const updateEvent = asyncHandler(async (req, res) => {

    if(!req.body.backgroundPosition){
        delete req.body.backgroundPosition
    }
    if(!Event.exists({_id: req.params.eventid, deleted: false})){
        res.status(400)
        throw new Error('Event with that id does not exist or has been deleted')
    }

    if(req.files?.image && req.files?.bigImage && req.body.resetImage !== 'true'){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image, req.files.bigImage)
        req.body.image = imageObject.image
        req.body.bigImage = imageObject.bigImage
    }

    if(req.body.resetImage === 'true'){
        req.body.image = null
        req.body.bigImage = null
    } else if (req.body.resetImage !== 'false' && !req.body.image){
        delete req.body.image
        delete req.body.bigImage
    }


    if(typeof(req.body.dayRoundArr)==='string'){
        //req.body.dayRoundArr = JSON.parse("[" + req.body.dayRoundArr + "]")
        req.body.dayRoundArr = req.body.dayRoundArr.split(',')
    }
    if(typeof(req.body.coincidingEvents)==='string'){
        //req.body.coincidingEvents = JSON.parse("[" + req.body.coincidingEvents + "]")
        req.body.coincidingEvents = req.body.coincidingEvents.split(',')
    }
    if(typeof(req.body.format)==='string'){
        //req.body.dayRoundArr = JSON.parse("[" + req.body.format + "]")
        req.body.format = req.body.format.split(',')
    }

    const oldEvent = await Event.findById(req.params.eventid)
    const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, req.body, {runValidators: true, new: true})
    

    if(oldEvent.image && (oldEvent.image !== event.image || oldEvent.bigImage !== event.bigImage) && !(await Event.findOne({image: oldEvent.image, bigImage: oldEvent.bigImage, deleted: false}))){
        await handleImageDeletion(oldEvent.image, oldEvent.bigImage)
    }

    //postEventEdit(event, req.user._id)

    //update embedded events in match data
    await Match.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})
    await Decklist.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})

    res.status(200)
    res.json(event)
})

// const editBackgroundPosition = asyncHandler(async (req, res) => {
//     if(!Event.exists({_id: req.params.eventid, deleted: false})){
//         res.status(400)
//         throw new Error('Event with that id does not exist or has been deleted')
//     }
//     const num = parseInt(req.body.backgroundPosition)
//     const event = await Event.findOneAndUpdate({_id: req.params.eventid, deleted: false}, {backgroundPosition: num}, {runValidators: true, new: true})
//     postEventEdit(event, req.user._id)
//     await Match.updateMany({'event._id': event._id}, {event: event}, {runValidators: true, new: true})
//     res.status(200).json(event)
// })

const getAllBackgroundImageLinks = asyncHandler(async (req, res) => {
    const pipeline = ([
        {"$group": {"_id": {image: '$image', bigImage: '$bigImage'}}}
    ])

    const eventQuery = await Event.aggregate(pipeline)

    let data = []

    eventQuery.map(entry => {
        if(entry._id.image){
            data.push(entry._id)
        }
    })

    res.status(200)
    res.json(data)
})

const deleteEvent = asyncHandler(async (req, res) => {
    //const oldEvent = await Event.findById(req.params.eventid)
    //const deletionName = oldEvent.name + crypto.randomUUID()
    // const event = await Event.findByIdAndUpdate(
    //     req.params.eventid,
    //     {
    //         deleted: true,
    //         //name: deletionName,
    //     },
    //     { new: true },
    // )

    const event = await Event.findByIdAndDelete(req.params.eventid)

    if(!event){
        res.status(400)
        throw new Error('event not found')
    }

    res.status(200)
    res.json(event)
})

// const restoreEvent = asyncHandler(async (req, res) => {
//     const event = await Event.findByIdAndUpdate(req.params.eventid, {deleted: false}, {new: true})

//     if(!event){
//         res.status(400)
//         throw new Error('event not found')
//     }

//     res.status(200)
//     res.json(event)
// })

const deleteBackgroundImage = asyncHandler(async (req, res) => {

    if(!req.body.image || !req.body.bigImage){
        res.status(400)
        throw new Error('You need to pass in image and bigImage links to be deleted')
    }

    await handleImageDeletion(req.body.image, req.body.bigImage)

    await Event.updateMany({image: req.body.image}, {image: null, bigImage: null})
    
    res.status(200)
    res.json({message: 'images deleted'})
})

// const checkIfHappeningNow = asyncHandler(async (req, res) => {
//     const date = new Date()
//     const currentDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))

//     const eventsHappeningNow = await Event.updateMany(
//         {"$or": [
//             {startDate: {'$lte': currentDate}, endDate: {'$gte': currentDate}},
//             {startDate: currentDate}
//         ]}, 
//         {
//             happeningNow: true
//         },
//         {
//             runValidators: true, 
//             new: true
//         }
//     )

//     const eventsNotHappeningAnymore = await Event.updateMany(
//         {
//             happeningNow: true,
//             "$or": [
//                 {startDate: {'$gte': currentDate}, endDate: {'$lte': currentDate}},
//                 {startDate: {'$ne': currentDate}}
//             ]
//         },
//         {
//             happeningNow: false
//         },
//         {
//             runValidators: true, 
//             new: true
//         }
//     )
    
//     //.limit(10).sort({startDate: -1})

//     res.status(200)
//     res.json({
//         eventsHappeningNow,
//         eventsNotHappeningAnymore
//     })

//     // const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0))
//     // const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999))
// })

module.exports = {
    getEvent,
    getEvents,
    postEvent,
    updateEvent,
    deleteEvent,
    getEventNames,
    getCurrentAndFutureEvents,
    getAllBackgroundImageLinks,
    deleteBackgroundImage,
    getLatestEvents
    //checkIfHappeningNow
    //editBackgroundPosition,
}