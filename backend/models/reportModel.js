const mongoose = require('mongoose')
//const ObjectId = require('mongodb').ObjectId

const reportSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: String,
    status: {
        type: String,
        required: true,
        enum: ['pending', 'fixed', 'closed']
    }
}, 
{timestamps: { createdAt: 'createdDate'}})

module.exports = mongoose.model('Report', reportSchema)