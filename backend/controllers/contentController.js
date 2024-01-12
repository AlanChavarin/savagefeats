const asyncHandler = require('express-async-handler')
const Content = require('../models/contentModel')
const ContentCreator = require('../models/contentCreatorModel')
const ObjectId = require('mongodb').ObjectId
//const parser = require('xml2json')

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

// const updateAllContent = asyncHandler(async (req, res) => {
//     
// })

const postContent = asyncHandler(async (req, res) => {
    const {videoid, type, relatedEventid, relatedMatchid, relatedDecklistid} = req.body

    if(!!(await Content.find({videoid}))){
        res.status(400)
        throw new Error('video of that id already in database')
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
    const data = response.json()
    const item = data.items[0]

    let contentCreatorid = null
    const contentCreator = await ContentCreator.find({channelid: item.channelId})
    if(!!contentCreator){
        contentCreatorid._id
    }

    const content = await Content.create({
        videoid: item.id,
        publishedAt: item.snippet.publishedAt,
        parentContentCreatorYoutubeChannelid: item.channelId,
        parentContentCreatorid: contentCreator._id,
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
        maxResults = 3
    }

    let page
    if(req.body.page){
        page = parseInt(req.body.page)
    } else {
        page = 0
    }

    const response  = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${contentCreator.parentContentCreatorYoutubeChannelid}&part=snippet,id&order=date&maxResults=${maxResults}`)

    const data = response.json()

    if(!Array.isArray(data.items)){
        res.status(400)
        throw new Error('missing items from data')
    }

    let newContentToInsert = []

    data.items.map(async (item) => {
        if(!(await Content.find({videoid: item.id.videoId}))){
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
            newContentToInsert.push(content)
        }
    })

    const insertedContent = await Content.insertMany(newContentToInsert)

    res.status(200)
    res.json(insertedContent)
})

module.exports = {
    getContentByContentCreator, 
    postContent,
    updateContentByContentCreator
}