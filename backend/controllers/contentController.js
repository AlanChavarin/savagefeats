const asyncHandler = require('express-async-handler')
const Content = require('../models/contentModel')
const ContentCreator = require('../models/contentCreatorModel')
const ObjectId = require('mongodb').ObjectId
//const parser = require('xml2json')

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
    const contentCreator = req.params.contentCreatorid
    let content
    if(ObjectId.isValid(contentCreator) && !!(await ContentCreator.findById(contentCreator))){
        content = await Content.find({parentContentCreatorid: contentCreator}).sort({publishedAt: -1})
    } else {
        res.status(400)
        throw new Error('given id could be wrong or channel does not exist')
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

//what the f*ck did i write here
//i aint even gonna test this just yet
const updateContentByContentCreator = asyncHandler(async (req, res) => {
    const contentCreator = await ContentCreator.findById(req.params.contentCreatorid)
    if(!contentCreator){
        res.status(400)
        throw new Error('channel by that given id was not found')
    }

    let maxResults
    if(req.body.maxResults){
        maxResults = parseInt(req.body.maxResults)
    } else {
        maxResults = 5
    }

    let page
    if(req.body.page){
        page = parseInt(req.body.page)
    } else {
        page = 0
    }

    const response  = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${contentCreator.channelid}&part=snippet,id&order=date&maxResults=${maxResults}`)

    const data = await response.json()

    //console.log(data)

    if(data.error){
        console.log(data.error.errors)
        res.status(400)
        throw new Error('data error')
    }

    if(!Array.isArray(data.items)){
        res.status(400)
        throw new Error('missing items from data')
    }

    const asyncOperation = async (item) => {
        if(!(await Content.exists({videoid: item.id.videoId}))){
            let content = {
                videoid: item.id.videoId,
                publishedAt: item.snippet.publishedAt,
                parentContentCreatorYoutubeChannelid: contentCreator.channelid,
                parentContentCreatorid: contentCreator._id,
                title: item.snippet.title,
                description: item.snippet.description,
                channelTitle: contentCreator.title,
                etag: item.etag
            }

            return(content)
        }
        return {}
    }

    Promise.all(data.items.map(item => asyncOperation(item)))
    .then(results => {
        const nonEmptyResults = results.filter(result => Object.keys(result).length > 0);
        return Content.insertMany(nonEmptyResults)
    })
    .then(content => {
        res.status(200)
        res.json(content)
    })
 
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

module.exports = {
    getAllContent,
    getContent,
    getContentByContentCreator, 
    postContent,
    updateContentRelatedData,
    updateContentByContentCreator,
    deleteContent
}