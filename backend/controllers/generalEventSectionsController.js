// make all of the basic functions I would need for this model, and then export them

const GeneralEventSection = require('../models/generalEventSectionModel')
const asyncHandler = require('express-async-handler')
const {handleImageFiles} = require('../helpers/cloudinaryHelper')
const Event = require('../models/eventModel')

const getGeneralEventSectionsByEventId = asyncHandler(async (req, res) => {
    const generalEventSections = await GeneralEventSection.find({eventId: req.params.eventId})
    res.status(200).json(generalEventSections)
})

const getGeneralEventSection = asyncHandler(async (req, res) => {

    if(!req.params.generalEventSectionId){
        res.status(400)
        throw new Error('No general event section id provided')
    }

    const generalEventSection = await GeneralEventSection.findOne({_id: req.params.generalEventSectionId})

    if(!generalEventSection){
        res.status(404)
        throw new Error('General event section not found')
    }

    res.status(200).json(generalEventSection)
})

const postGeneralEventSection = asyncHandler(async (req, res) => {

    if(!req.body.header){
        res.status(400)
        throw new Error('Please enter a header')
    }

    if(!req.body.event){
        res.status(400)
        throw new Error('Please enter an event')
    }

    // check that the event exists
    const event = await Event.findOne({name: req.body.event})
    if(!event){
        res.status(400)
        throw new Error('Event with that name does not exist')
    }

    req.body.eventId = event._id

    if(req.files?.image){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image)
        req.body.image = imageObject.image
    } else if(!req.body?.image?.startsWith('http')){
        delete req.body.image
    }

    const generalEventSection = await GeneralEventSection.create(req.body)
    res.status(200).json(generalEventSection)
})


const updateGeneralEventSection = asyncHandler(async (req, res) => {

    if(!req.params.generalEventSectionId){
        res.status(400)
        throw new Error('No general event section id provided')
    }

    if(!(await GeneralEventSection.exists({_id: req.params.generalEventSectionId}))){
        res.status(400)
        throw new Error('General event section with that id does not exist')
    }

    console.log(req.body.header)
    console.log(req.params.generalEventSectionId)
    console.log(req.body.event)

    
    req.body.event = await Event.findOne({name: req.body.event})

    if(req.files?.image){
        //call cloudinary helper function that takes the files, handles upload, and returns the image links
        const imageObject = await handleImageFiles(req.files.image)
        req.body.image = imageObject.image
    } else if(!req.body?.image?.startsWith('http')){
        delete req.body.image
    }

    // return the new updated general event section
    const generalEventSection = await GeneralEventSection.findByIdAndUpdate(req.params.generalEventSectionId, req.body, {new: true})
    res.status(200).json(generalEventSection)
})

const deleteGeneralEventSection = asyncHandler(async (req, res) => {

    if(!req.params.generalEventSectionId){
        res.status(400)
        throw new Error('No event id provided')
    }

    const generalEventSection = await GeneralEventSection.findByIdAndDelete(req.params.generalEventSectionId)

    res.status(200).json(generalEventSection)
})

const getAllSectionImageLinks = asyncHandler(async (req, res) => {
    const pipeline = ([
        {"$group": {"_id": {image: '$image'}}}
    ])

    const generalEventSectionQuery = await GeneralEventSection.aggregate(pipeline)

    let data = []

    generalEventSectionQuery.map(entry => {
        if(entry._id.image){
            data.push(entry._id)
        }
    })

    res.status(200)
    res.json(data)
})


module.exports = {
    getGeneralEventSectionsByEventId,
    getGeneralEventSection,
    postGeneralEventSection,
    deleteGeneralEventSection,
    updateGeneralEventSection,
    getAllSectionImageLinks
}