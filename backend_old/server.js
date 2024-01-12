const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

app.listen(PORT, () => {
    console.log('app listening on port: ' + PORT)
})

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'myDatabase'
})

app.get('/api/example', (req, res) => {
    res.status(200)
    res.json({
        data: 'this data comes from my backend!!!!!'
    })
})

app.use('/api/users', require('./routes/userRoutes'))