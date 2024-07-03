const asyncHandler = require('express-async-handler')
const Draft = require('../models/draftModel')
const Event = require('../models/eventModel')
const Match = require('../models/matchModel')
const wordWrapper = require('../helpers/wordWrapper')
const ObjectId = require('mongodb').ObjectId

const getDrafts = asyncHandler(async (req, res) => {
    const drafts = await Draft.find({})

    res.status(200)
    res.json(drafts)
})

const getDraftsByEvent = asyncHandler(async (req, res) => {
    let drafts
    if(ObjectId.isValid(req.params.event)){
        const doesEventExist = await Event.exists({'_id': new ObjectId(req.params.event)})
        if(!doesEventExist){
            res.status(400)
            throw new Error('event of that name or id not found')
        }

        drafts = await Draft.find({'event._id': new ObjectId(req.params.event)}).sort({top8: 1, swissRound: 1})

    } else {
        const doesEventExist = await Event.exists({'name': req.params.event})
        if(!doesEventExist){
            res.status(400)
            throw new Error('event of that name or id not found')
        }

        drafts = await Draft.find({'event.name': req.params.event}).sort({top8: 1, swissRound: 1})
    }
    res.status(200)
    res.json(drafts)
})

const getDraft = asyncHandler(async (req, res) => {
    const draft = await Draft.findOne({_id: req.params.draftid})

    if(!draft){
        res.status(400)
        throw new Error('Match with that id not found')
    }

    relatedMatches = []

    if(req.query.includeRelatedMatches==='true'){
        // add on new data to match object

        let find = {'event._id': draft.event._id}

        const matchesByEvent = await Match.find(find).sort({top8: 1, swissRound: 1})

        if(2 < matchesByEvent.length){

            if(draft.top8){
                relatedMatches[0] = matchesByEvent[matchesByEvent.length-3]
                relatedMatches[1] = matchesByEvent[matchesByEvent.length-2]
            }

            for(let i = 0; i < matchesByEvent.length; i++){
                if(!draft.top8 && matchesByEvent[i].swissRound === draft.swissRound){
                    if(i < matchesByEvent.length-2){
                        relatedMatches[0] = matchesByEvent[i]
                        relatedMatches[1] = matchesByEvent[i+1]
                    } else if(i < matchesByEvent.length-1){
                        relatedMatches[0] = matchesByEvent[i]
                        relatedMatches[1] = matchesByEvent[i-2]
                    } else {
                        relatedMatches[0] = matchesByEvent[i-1]
                        relatedMatches[1] = matchesByEvent[i-2]
                    }
                }
            }

           
        }
        draft.relatedMatches = relatedMatches
    }

    res.status(200)
    res.json(draft)
})

const postDraft = asyncHandler(async (req, res) => {
    const {
     event, twitch, twitchTimeStamp, link, timeStamp, top8, swissRound, playerName
    } = req.body
    const eventData = await Event.findOne({name: event})

    const draft = await Draft.create({
        top8: top8,
        swissRound: swissRound,
        event: eventData,
        twitch: twitch,
        twitchTimeStamp: twitchTimeStamp,
        link: link,
        timeStamp: timeStamp,
        playerName: playerName,
    })


    res.status(200)
    res.json(draft)
})

const updateDraft = asyncHandler(async (req, res) => {
    if(!Draft.exists({_id: req.params.draftid, deleted: false})){
        res.status(400)
        throw new Error('Match with that id does not exist or has been deleted')
    }
    req.body.event = await Event.findOne({name: req.body.event})

    const draft = await Draft.findOneAndUpdate({_id: req.params.draftid}, req.body, {runValidators: true, new: true})
    res.status(200)
    res.json(draft)
    
})

const deleteDraft = asyncHandler(async (req, res) => {
    const draft = await Draft.findByIdAndDelete(req.params.draftid)
    if(!draft){
        res.status(400)
        throw new Error('given match doesnt exist')
    }
    res.status(200)
    res.json(draft)
})

module.exports = {
    getDrafts,
    getDraftsByEvent,
    getDraft,
    postDraft,
    updateDraft,
    deleteDraft,

}