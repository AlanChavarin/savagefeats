const asyncHandler = require('express-async-handler')
const Content = require('../models/contentModel')
const ContentCreator = require('../models/contentCreatorModel')
const ObjectId = require('mongodb').ObjectId
//const parser = require('xml2json')
const Parser = require("rss-parser")
const Match = require('../models/matchModel')
const Event = require('../models/eventModel')
const {Decklist} = require('../models/decklistModel')
const LiveStream = require('../models/liveStreamModel')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getAllContent = asyncHandler(async (req, res) => {
    const content = await Content.find()
    res.status(200)
    res.json(content)
}) 

const getContent = asyncHandler(async (req, res) => {
    const content = await Content.findById(new ObjectId(req.params.contentid))

    if(!content){
        res.status(400)
        throw new Error('content of that id not found')
    }

    res.status(200)
    res.json(content)
})

const getContentByContentCreator = asyncHandler(async (req, res) => {
    const contentCreator = new ObjectId(req.params.contentcreatorid)
    let content
    if(ObjectId.isValid(contentCreator) && !!(await ContentCreator.findById(contentCreator))){
        content = await Content.find({parentContentCreatorid: contentCreator}).sort({publishedAt: -1}).limit(req.query.limit)
    } else {
        res.status(400)
        throw new Error('given id could be wrong or channel does not exist')
    }

    if(req.query.idonly === 'true'){
        const data = content.map(content => content.videoid)
        res.status(200)
        res.json(data)
        return
    }
    res.status(200)
    res.json(content)
})

const postContent = asyncHandler(async (req, res) => {
    const {videoid, type, relatedEventid, relatedMatchid, relatedDecklistid} = req.body

    if(!!(await Content.findOne({videoid}))){
        res.status(400)
        throw new Error('video of that id already in database')
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await response.json()

    const item = data.items[0]

    const contentCreator = await ContentCreator.findOne({channelid: item.channelId})

    const content = await Content.create({
        videoid: item.id,
        publishedAt: item.snippet.publishedAt,
        parentContentCreatorYoutubeChannelid: item.snippet.channelId,
        parentContentCreatorid: contentCreator ? contentCreator._id : null,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.title,
        
        type,
        relatedEventid,
        relatedMatchid,
        relatedDecklistid
    })

    res.status(200)
    res.json(content)

})

const postPortfolioContent = asyncHandler(async (req, res) => {
    const {videoid} = req.body

    if(!videoid){
        res.status(400)
        throw new Error('empty videoid field')
    }

    if(!!(await Content.findOne({videoid}))){
        res.status(400)
        throw new Error('video of that id already in database')
    }

    const content = await Content.create({videoid, type: 'portfolio'})
    res.status(200)
    res.json(content)
})

const getPortfolioContent = asyncHandler(async (req, res) => {
    const content = await Content.find({type: 'portfolio'})
    res.status(200)
    res.json(content)
})

//data that isn't grabbed from youtube api, only type, relatedEventid, relatedMatchid, relatedDecklistid
const updateContentRelatedData = asyncHandler(async (req, res) => {
    //req.params.contentid

    if(!(await Content.findById(new ObjectId(req.params.contentid)))){
        res.status(400)
        throw new Error('content of that id not found')
    }

    const {type, relatedEventid, relatedMatchid, relatedDecklistid} = req.body
    const content = await Content.findByIdAndUpdate(new ObjectId(req.params.contentid), {
        type, relatedEventid, relatedMatchid, relatedDecklistid
    }, {new: true, runValidators: true})

    res.status(200)
    res.json(content)
})


const updateContentByContentCreator = asyncHandler(async (req, res) => {

    try{
        await updateContentByContentCreator_AbtractedOutLogic(req.params.contentcreatorid)
    } catch(error) {
        res.status(400)
        throw new Error(error)
    }

    res.status(200)
    res.json({"message": "success"})
 
})

const updateContentForAllCreators = asyncHandler(async (req, res) => {
    try{
        updateContentForAllCreators_AbtractedOutLogic()
    } catch(error) {
        res.status(400)
        throw new Error(error)
    }

    res.status(200)
    res.json({message: "success"})
})

const deleteContent = asyncHandler(async (req, res) => {
    const content = await Content.findOneAndDelete({_id: req.params.contentid})
    if(!content){
        res.status(200)
        throw new Error('content id not found')
    }
    
    res.status(200)
    res.json(content)
})

const deleteContentVideoId = asyncHandler(async (req, res) => {
    const content = await Content.findOneAndDelete({videoid: req.params.videoid})
    if(!content){
        res.status(200)
        throw new Error('content id not found')
    }
    
    res.status(200)
    res.json(content)
})

const latestInFleshAndBlood = asyncHandler(async (req, res) => {
    //grab match(nevermind)
    //grab decklist
    //grab latest mansant video
    //grab latest savage lands news video
    //grab latest 3 tournaments
    //grab live streams

    const decklist = await Decklist.find({deckTech: { "$nin": [null, ""] }}).limit(1).sort({"event.startDate": -1})

    const events = await Event.find({deleted: false}).sort({startDate: -1}).limit(1)

    const contentCreators = await ContentCreator.find({featured: true})

    let arr = []

    await Promise.all(contentCreators.flatMap(async contentCreator => {
        const contents = await Content.find({parentContentCreatorid: contentCreator._id}).sort({publishedAt: -1}).limit(2)
        contents.map(content => arr.push(content))
    }))

    arr.sort((a, b) => a.publishedAt - b.publishedAt)

    let contentVideoIds = arr.map(content => content.videoid)

    contentVideoIds.unshift(decklist[0].deckTech)

    const liveStreams = await LiveStream.find({})

    liveStreams.map(liveStream => contentVideoIds.unshift(liveStream.link))
    
    res.status(200)
    res.json({
        videoIds: contentVideoIds,
        events: events,
    })
})

// abtracted out functions

const updateContentByContentCreator_AbtractedOutLogic = async (contentCreatorId) => {
    const contentCreator = await ContentCreator.findById(contentCreatorId)
    if(!contentCreator){
        //res.status(400)
        throw new Error('channel by that given id was not found')
    }

    const parser = new Parser()

    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${contentCreator.channelid}`)

    let youtubeIds = []

    for(let i = 0; i < feed.items.length; i++){
        const videoUrlParts = feed.items[i].link.split('?v=') 
        youtubeIds.push(videoUrlParts[videoUrlParts.length - 1])
    }

    const content = await Content.find({parentContentCreatorid: contentCreatorId})

    const contentYoutubeIds = content.map(content => content.videoid)

    let youtubeVideoData = []

    for(let i = 0; i < youtubeIds.length; i++){
        if(!contentYoutubeIds.includes(youtubeIds[i])){
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeIds[i]}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
            const data = await response.json()
            youtubeVideoData.push(data.items[0])
            await sleep(200)
        }
    }

    youtubeVideoData.map(async (item) => {
        const content = await Content.create({
            videoid: item.id,
            publishedAt: item.snippet.publishedAt,
            parentContentCreatorYoutubeChannelid: item.snippet.channelId,
            parentContentCreatorid: contentCreator ? contentCreator._id : null,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.title,
        })

        console.log("Content posted, title:" + content.title + ", id:" + content.videoid)
    })

    
}

const updateContentForAllCreators_AbtractedOutLogic = async () => {
    console.log("running updateContentForAllCreators_AbtractedOutLogic()")
    const creators = await ContentCreator.find({})        
        
    await creators.map(async (creator) => {
        console.log("Updating content for " + creator.title)
        await updateContentByContentCreator_AbtractedOutLogic(creator._id)
    })
}

module.exports = {
    getAllContent,
    getContent,
    getContentByContentCreator, 
    postContent,
    updateContentRelatedData,
    updateContentByContentCreator,
    deleteContent,
    latestInFleshAndBlood,
    postPortfolioContent,
    getPortfolioContent,
    deleteContentVideoId,
    updateContentForAllCreators,
    updateContentForAllCreators_AbtractedOutLogic
}