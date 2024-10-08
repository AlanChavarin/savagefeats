const asyncHandler = require('express-async-handler')
const ContentCreator = require('../models/contentCreatorModel')
const wordWrapper = require('../helpers/wordWrapper')
const ObjectId = require('mongodb').ObjectId

const getContentCreators = asyncHandler(async (req, res) => {
    let find = {}

    if(req.query.featured === 'true'){
        find['featured'] = true
    }

    const contentCreators = await ContentCreator.find(find)
    res.status(200)
    res.json(contentCreators)
})

const getContentCreator = asyncHandler(async (req, res) => {
    const contentCreator = await ContentCreator.findById(req.params.contentcreatorid)
    if(!contentCreator){
        res.status(400)
        throw new Error('content creator id not found')
    }

    res.status(200)
    res.json(contentCreator)
    
})

const postContentCreator = asyncHandler(async (req, res) => {
    if(!req.body.channelid){
        res.status(400)
        throw new Error('no id provided')
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${process.env.YOUTUBE_API_KEY}&id=${req.body.channelid}&part=snippet`)

    const data = await response.json()

    if(!data.items){
        res.status(400)
        throw new Error('Channel ID likely doesnt exist')
    }

    const item = data.items[0]

    const contentCreator = await ContentCreator.create({
        channelid: item?.id,
        title: item?.snippet?.title,
        customUrl: item?.snippet?.customUrl,
        description: item?.snippet?.description,
        publishedAt: item?.snippet?.publishedAt,
        profilePictureDefault: item?.snippet?.thumbnails?.default?.url,
        profilePictureMedium: item?.snippet?.thumbnails?.medium?.url,
        profilePictureHigh: item?.snippet?.thumbnails?.high?.url,
        etag: item?.etag,
        featured: req.body.featured,
        backgroundImage: req.body.backgroundImage,
    })

    res.status(200)
    res.json(contentCreator)
})

const updateContentCreator = asyncHandler(async (req, res) => {
    const contentCreator = await ContentCreator.findById(new ObjectId(req.params.contentcreatorid))

    if(!contentCreator){
        res.status(400)
        throw new Error('channel of that id not found')
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${process.env.YOUTUBE_API_KEY}&id=${contentCreator.channelid}&part=snippet`)

    const data = await response.json()

    const item = data.items[0]

    console.log(item)

    if(item.etag !== contentCreator.etag){
        const updatedContentCreator = await ContentCreator.findByIdAndUpdate(
            new ObjectId(contentCreator._id), 
            {
                channelid: item?.id,
                title: item?.snippet?.title,
                customUrl: item?.snippet?.customUrl,
                description: item?.snippet?.description,
                publishedAt: item?.snippet?.publishedAt,
                profilePictureDefault: item?.snippet?.thumbnails?.default?.url,
                profilePictureMedium: item?.snippet?.thumbnails?.medium?.url,
                profilePictureHigh: item?.snippet?.thumbnails?.high?.url,
                etag: item?.etag
            },
            { new: true, runValidators: true}
        )

        res.status(200)
        res.json(updatedContentCreator)
    } else {
        res.status(200)
        res.json({
            message: "etag found to be the same, no updates done"
        })
    }
})

const updateContentCreatorNonYoutubeData = asyncHandler(async (req, res) => {
    const contentCreator = await ContentCreator.findById(new ObjectId(req.params.contentcreatorid))

    if(!contentCreator){
        res.status(400)
        throw new Error('channel of that id not found')
    }

    const updatedContentCreator = await ContentCreator.findByIdAndUpdate(
        new ObjectId(contentCreator._id), 
        {
            featured: req.body.featured,
            backgroundImage: req.body.backgroundImage
        },
        { new: true, runValidators: true}
    )

    res.status(200)
    res.json(updatedContentCreator)

})

const deleteContentCreator = asyncHandler(async (req, res) => {
    const contentCreator = await ContentCreator.findByIdAndDelete(new ObjectId(req.params.contentcreatorid))

    if(!contentCreator){
        res.status(400)
        throw new Error('channel of that id not found')
    }

    res.status(200)
    res.json(contentCreator)
})


module.exports = {
    getContentCreators, 
    getContentCreator, 
    postContentCreator, 
    updateContentCreator, 
    deleteContentCreator,
    updateContentCreatorNonYoutubeData
}