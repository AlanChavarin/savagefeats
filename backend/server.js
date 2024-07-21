const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {errorHandler} = require('./middleware/errorMiddleware')
const {sanitate} = require('./middleware/sanitateMiddleware')
require('dotenv').config()
const cors = require('cors')
const cron = require('node-cron')
const {updateContentForAllCreators_AbtractedOutLogic, updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic} = require('./controllers/contentController')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


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

cron.schedule('*/1 * * * *', async () => {
    console.log('cron job fired: running updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic()' + ' At date: ' + new Date())
    updateUpcomingContentToSeeIfItsLive_AbtractedOutLogic()
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


