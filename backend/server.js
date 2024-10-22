process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
  });

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {errorHandler} = require('./middleware/errorMiddleware')
const {sanitate} = require('./middleware/sanitateMiddleware')
require('dotenv').config()
const cors = require('cors')
const cron = require('node-cron')
const {updateContentForAllCreators_AbtractedOutLogic, updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic,  deleteContentThatHasBeenDeleted_AbstractedOutLogic} = require('./controllers/contentController')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const {findAndInsertDecksFromWebpageData} = require('./CRONables/deckScraper')


//const cors = require('cors')
//const dotenv = require('dotenv').config()
//const path = require('path')
// console.log((process.env.NODE_ENV==='production') ? 'https://savagefeats-production.up.railway.app/' : 'http://localhost:5000')

app.use(cors({
    origin: process.env.CORS,
}))

app.listen(process.env.PORT, () => {
    console.log('App started on port ' + process.env.PORT)
    console.log('App is currently in ' + process.env.NODE_ENV + ' mode.')
})

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'eyeofophidia'
})

app.use(sanitate)
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/matches', require('./routes/matchRoutes'))
app.use('/api/decklists', require('./routes/decklistRoutes'))
app.use('/api/drafts', require('./routes/draftRoutes'))
app.use('/api/generalEventSections', require('./routes/generalEventSectionRoutes'))

app.use('/api/names', require('./routes/nameRoutes'))
app.use('/api/heroes', require('./routes/heroRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/content', require('./routes/contentRoutes'))
app.use('/api/contentcreators', require('./routes/contentCreatorRoutes'))

app.use('/api/reports', require('./routes/reportRoutes'))

app.use('/api/livestreams', require('./routes/liveStreamRoutes'))

app.use(errorHandler)

// cron jobs

cron.schedule('*/10 * * * *', async () => {
    console.log('cron job fired: running updateContentForAllCreators_AbtractedOutLogic()' + ' At date: ' + new Date())
    updateContentForAllCreators_AbtractedOutLogic()
})

cron.schedule('*/20 * * * *', async () => {
    console.log('cron job fired: running deleteContentThatHasBeenDeleted_AbstractedOutLogic' + ' At date: ' + new Date())
    deleteContentThatHasBeenDeleted_AbstractedOutLogic()
})

cron.schedule('*/10 * * * *', async () => {
    console.log('cron job fired: running updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic()' + ' At date: ' + new Date())
    updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic()
})

cron.schedule('0 0 * * *', async () => {
    console.log('cron job fired: running findEventsFromWebpageData()' + ' At date: ' + new Date())
    findAndInsertDecksFromWebpageData(1)
})


//app.use('/api/issues', require('./routes/issueRoutes'))
//app.use('/api/admin', require('./routes/adminRoutes'))  
//app.use('/api/comments', require('./routes/commentRoutes'))
//app.use('/api/matchedithistory', require('./routes/matchEditHistoryRoutes'))
//app.use('/api/eventedithistory', require('./routes/eventEditHistoryRoutes'))
//app.use('/api/liveevent', require('./routes/liveEventRoutes'))
//app.use('/api/test', require('./routes/testRoutes'))

// app.use(express.static('frontend/build'))
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve( 'frontend', 'build', 'index.html'))
// })
