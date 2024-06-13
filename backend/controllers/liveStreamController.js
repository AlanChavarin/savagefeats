const asyncHandler = require('express-async-handler')
const LiveStream = require('../models/liveStreamModel')

const getLiveStreams = asyncHandler(async (req, res) => {
    const liveStreams = await LiveStream.find({})

    let data = liveStreams.map(liveStream => liveStream.link)

    res.status(200)
    res.json(data)
})

const postLiveStream = asyncHandler(async (req, res) => {

    if(!req.body.link){
        res.status(400)
        throw new Error('link not found')
    }

    const liveStream = await LiveStream.create({
        link: req.body.link
    })
    
    res.status(200)
    res.json(liveStream)
})


const deleteLiveStream = asyncHandler(async (req, res) => {
    const liveStream = await LiveStream.findOneAndDelete({link: req.params.link})
    
    if(!liveStream){
        res.status(400)
        throw new Error('given livestream doesnt exist')
    }

    res.status(200)
    res.json(liveStream)
})

module.exports = {
    getLiveStreams,
    postLiveStream,
    deleteLiveStream
}