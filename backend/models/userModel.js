const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        required: true,
        enum: ['admin', 'moderator', 'user', 'banned'] 
    },
    verified: {
        type: Boolean,
        required: true
    },
    tokenUsedForSigningUp: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema)