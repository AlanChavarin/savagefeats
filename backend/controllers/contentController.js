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
const getTodaysDate = require('../helpers/getTodaysDate')

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

const getContentByEvent = asyncHandler(async (req, res) => {
    const content = await Content.find({parentEventId: req.params.parenteventid})

    res.status(200)
    res.json(content)
})

const getContentByType = asyncHandler(async (req, res) => {
    const content = await Content.find({type: req.query.type})

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
    const {videoid, type, relatedEventid, relatedMatchid, relatedDecklistid, parentEventName} = req.body

    let parentEventId

    if(!!(await Content.findOne({videoid}))){
        // res.status(400)
        // throw new Error('video of that id already in database')
        await Content.findOneAndDelete({videoid})
    }

    if(parentEventName){
        parentEventId = (await Event.findOne({name: parentEventName}))._id
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoid}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
    const data = await response.json()

    const item = data.items[0]

    const contentCreator = await ContentCreator.findOne({channelid: item.channelId})

    let profilePicture
    if(!contentCreator && item?.snippet?.channelId){
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${process.env.YOUTUBE_API_KEY}&id=${item.snippet.channelId}&part=snippet`)

        const data = await response.json()

        //console.log(data?.items[0]?.snippet?.thumbnails?.default?.url)

        profilePicture = data?.items[0]?.snippet?.thumbnails?.default?.url
    } else if(contentCreator){
        profilePicture = contentCreator.profilePicture
    }

    const content = await Content.create({
        videoid: item.id,
        publishedAt: item.snippet.publishedAt,
        parentContentCreatorYoutubeChannelid: item.snippet.channelId,
        parentContentCreatorid: contentCreator ? contentCreator._id : null,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.title,
        liveBroadcastContent: item.snippet.liveBroadcastContent,
        thumbnail: item.snippet?.thumbnails?.medium?.url,
        profilePicture,
        
        type,
        relatedEventid,
        relatedMatchid,
        relatedDecklistid,
        parentEventId,
    })

    if(content.liveBroadcastContent && parentEventId){
        await Event.findByIdAndUpdate(new ObjectId(parentEventId), {
            liveBroadcastContent: content.liveBroadcastContent,
            streamed: true
        })
    }

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
    const content = await Content.find({type: 'portfolio'}).sort({publishedAt: -1})
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
    await updateContentByContentCreator_AbtractedOutLogic(req.params.contentcreatorid)
    res.status(200)
    res.json({"message": "success"})
 
})

const updateContentForAllCreators = asyncHandler(async (req, res) => {
    updateContentForAllCreators_AbtractedOutLogic()
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

const deleteContentByEvent = asyncHandler(async (req, res) => {
    const content = await Content.deleteMany({parentEventId: req.params.eventid})
    res.status(200)
    res.json({
        deletedCount: content && content.length
    })
})

const latestInFleshAndBlood = asyncHandler(async (req, res) => {
    //const decklist = await Decklist.find({deckTech: { "$nin": [null, ""] }}).limit(1).sort({"event.startDate": -1})

    //const events = await Event.find({deleted: false}).sort({startDate: -1}).limit(1)

    let arr = []
    let limit = 3

    const liveStreamsAndFeaturedContent = await Content.find({
        "$or": [
            {liveBroadcastContent: 'upcoming'},
            {liveBroadcastContent: 'live'},
            {type: 'featured'}
        ],
        parentContentCreatorid: null
    })

    liveStreamsAndFeaturedContent.map(content => arr.push(content))

    // const featuredContent = await Content.find({
    //     type: 'featured'
    // })

    // featuredContent.map(content => arr.push(content))

    //limit = limit - (Math.floor(arr.length/2))

    const contentCreators = await ContentCreator.find({featured: true})

    console.log("Limit: ", limit)

    await Promise.all(contentCreators.flatMap(async contentCreator => {
        const contents = await Content.find({parentContentCreatorid: contentCreator._id}).sort({publishedAt: -1}).limit(limit)
        contents.map(content => arr.push(content))
    }))

    arr.sort((a, b) => b.publishedAt - a.publishedAt)
    arr.sort((a, b) => {
        if (a.liveBroadcastContent === "live" && b.liveBroadcastContent !== "live") {
          return -1
        }
        if (a.liveBroadcastContent !== "live" && b.liveBroadcastContent === "live") {
          return 1
        }
        return 0
      })

    //let contentVideoIdsAndThumbnails = arr.map(content => {return {"videoid": content.videoid, "thumbnail": content.thumbnail}})

    //contentVideoIds.unshift(decklist[0].deckTech)

    //const liveStreams = await LiveStream.find({})

    //liveStreams.map(liveStream => contentVideoIdsAndThumbnails.unshift({"videoid": liveStream.link, "thumbnail": null}))

    //console.log(arr.map(item => item.videoid))
    
    res.status(200)
    res.json(arr)
})

const getFeaturedContentCreatorsAndTheirLatest8Videos = asyncHandler(async (req, res) => {
    const contentCreators = await ContentCreator.find({featured: true})
    let arr = []
    await Promise.all(contentCreators.map(async contentCreator => {
        const contents = await Content.find({parentContentCreatorid: contentCreator._id}).sort({publishedAt: -1}).limit(8)
        //contents.map(content => arr.push(content))
        arr.push({
            contentCreator,
            contents
        })
    }))

    res.status(200)
    res.json(arr)
})

const updateUpcomingContentToSeeIfItsLive = asyncHandler(async (req, res) => {

    try{
        updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic()
    } catch (error){
        throw new Error(error)
    }
    res.status(200)
    res.json({message: "success"})
})

// abtracted out functions

const updateContentByContentCreator_AbtractedOutLogic = async (contentCreatorId) => {
    const contentCreator = await ContentCreator.findById(contentCreatorId)
    if(!contentCreator){
        //res.status(400)
        throw new Error('channel by that given id was not found')
    }

    const parser = new Parser()

    // grab latest youtube ids for given content creator
    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${contentCreator.channelid}`)

    let youtubeIds = []

    // ids filtered and put into youtubeIds
    for(let i = 0; i < feed.items.length; i++){
        const videoUrlParts = feed.items[i].link.split('?v=') 
        youtubeIds.push(videoUrlParts[videoUrlParts.length - 1])
    }

    // get all current content in our database from our creator
    const content = await Content.find({parentContentCreatorid: contentCreatorId})

    // filter to just the video ids
    const contentYoutubeIds = content.map(content => content.videoid)

    let youtubeVideoData = []

    // we loop through each video id in youtubeIds, and check if that id is already in our database
    // if its not, we pull the full data and add it to our database
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
            thumbnail: item.snippet?.thumbnails?.medium?.url,
            profilePicture: contentCreator ? contentCreator.profilePictureDefault : null,
            liveBroadcastContent: item.snippet.liveBroadcastContent,
        })

        console.log("Content posted, title:" + content.title + ", id:" + content.videoid)
    })
}

const updateContentForAllCreators_AbtractedOutLogic = async () => {

    try{
        console.log("running updateContentForAllCreators_AbtractedOutLogic()")
        const creators = await ContentCreator.find({})        

        await creators.map(async (creator) => {
            console.log("Updating content for " + creator.title)
            await updateContentByContentCreator_AbtractedOutLogic(creator._id)
        })
    } catch (error) {
        console.error(error)
    }

    
}

const updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic = async () => {
    //const date = getTodaysDate()
    
    try{
        const contents = await Content.find({
            liveBroadcastContent: { "$exists": true, "$ne": "none" }
        })
        console.log("contents.length", contents.length)

        for(const content of contents){
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${content.videoid}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
            const data = await response.json()
            const item = data?.items[0]
            const parentEvent = await Event.findById(content.parentEventId)

            if(content?.liveBroadcastContent !== item?.snippet?.liveBroadcastContent || parentEvent?.liveBroadcastContent !== item?.snippet?.liveBroadcastContent){
                const newUpdatedContent = await Content.findByIdAndUpdate(new ObjectId(content._id), {liveBroadcastContent: item.snippet.liveBroadcastContent}, {new: true, runValidators: true})

                console.log(`Updated content ${newUpdatedContent.title} -> LiveBroadcastContent: ${newUpdatedContent.liveBroadcastContent}`)

                // we have to see if other streams attached to this event are still upcoming before we can change the livebroadcastcontent
                //this is already stored in the variable contents


                if(parentEvent){

                    const contentsFromTheSameEvent = contents.filter(currentContent => (currentContent.parentEventId?.equals(parentEvent._id)) && (currentContent?.videoid !== content?.videoid))


                    if(newUpdatedContent?.liveBroadcastContent === 'none'){
                        if(contentsFromTheSameEvent.some(content => (content?.liveBroadcastContent !== 'none'))){
                            // do nothing
                            console.log("Event not updated to 'none' due to other live content still upcoming or live")
                        } else {
                            const newEvent = await Event.findByIdAndUpdate(newUpdatedContent?.parentEventId, {
                                liveBroadcastContent: item?.snippet?.liveBroadcastContent
                            }, {
                                runValidators: true,
                                new: true
                            })

                            console.log("Event Updated liveBroadcastContent: " + newEvent?.liveBroadcastContent)
                        }
                    }

                    if(newUpdatedContent?.liveBroadcastContent === 'upcoming'){
                        if(contentsFromTheSameEvent.some(content => (content?.liveBroadcastContent === 'live'))){
                            // do nothing
                            console.log("Event not updated to 'upcoming' due to other live content still upcoming or live")
                        } else {
                            const newEvent = await Event.findByIdAndUpdate(newUpdatedContent?.parentEventId, {
                                liveBroadcastContent: item?.snippet?.liveBroadcastContent
                            }, {
                                runValidators: true,
                                new: true
                            })

                            console.log("Event Updated liveBroadcastContent: " + newEvent?.liveBroadcastContent)
                        }
                    
                    }

                    if(newUpdatedContent?.liveBroadcastContent === 'live'){

                        const newEvent = await Event.findByIdAndUpdate(newUpdatedContent?.parentEventId, {
                            liveBroadcastContent: item?.snippet?.liveBroadcastContent
                        }, {
                            runValidators: true,
                            new: true
                        })

                        console.log("Event Updated liveBroadcastContent: " + newEvent?.liveBroadcastContent)
                    
                    }

                }

                
            }

            await sleep(1000)
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteContentThatHasBeenDeleted_AbstractedOutLogic = async () => {
    const content = await Content.find({parentContentCreatorid: {$ne: null}}).limit(6)

    console.log("Content.length: ", content.length)

    const videoids = content.map(content => content.videoid)

    console.log("videoids.length", videoids.length)

    // using a forloop here since it works with sleeping properly
    for(const id of videoids){
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
        const data = await response.json()
        if(data?.items?.length === 0){
            // then this content does not exist anymore, we need to remove it
            const content = await Content.findOneAndDelete({videoid: id}, {new: true})
            console.log('Content removed: ', id)
        }
        console.log("Content checked")
        await sleep(1000)
    }

}

// temp routes for one time updates of content!

// const oneTimeUpdateForThumbnails = asyncHandler(async (req, res) => {
//     //get all content
//     const content = await Content.find({})

//     //get its full data using its youtubeid and update its thumbnail field
//     const contentYoutubeIds = content.map(content => content.videoid)

//     console.log(contentYoutubeIds)

//     let youtubeVideoData = []

//     for(let i = 0; i < contentYoutubeIds.length; i++){
//         const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${contentYoutubeIds[i]}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
//         const data = await response.json()
//         youtubeVideoData.push(data.items[0])
//         console.log(data.items[0].snippet?.thumbnails?.medium?.url)
//         await sleep(500)
//     }

//     youtubeVideoData.map(async (item) => {
//         const content = await Content.updateOne(
//             {
//                 videoid: item.id
//             }
//             ,
//             {   
//                 thumbnail: item.snippet?.thumbnails?.medium?.url //we are only updating the thumbnail here
//             }
//         )

//         console.log("Content thumbnail updated, title:" + content.title + ", id:" + content.videoid + ", thumbnail Link: " + content.thumbnail)
//     })

//     res.status(200)
//     res.json({message: "Success! (Hopefully)"})
// })


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
    updateContentForAllCreators_AbtractedOutLogic,
    getFeaturedContentCreatorsAndTheirLatest8Videos,
    updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic,
    getContentByEvent,
    updateUpcomingContentToSeeIfItsLive,
    deleteContentByEvent,
    getContentByType,
    deleteContentThatHasBeenDeleted_AbstractedOutLogic
    //oneTimeUpdateForThumbnails,

}