const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

const generateSignUpLink = asyncHandler(async (req, res) => {
    const payload = {role: 'user'}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })

    let link
    if(process.env.NODE_ENV==='development'){
        link = `http://localhost:${process.env.PORT}`
    } else {
        link = 'www.savagefeats.com'
    }

    console.log(`${link}/register/${token}`)
    res.status(200)
    res.json({
        link: `${link}/register/${token}`,
        token
    })
})

const registerUser = asyncHandler(async (req, res) => {
    //check jwt token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const decodedPayload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
            if(decodedPayload?.role !== 'user'){
                throw new Error('token error, cannot register')
            }

            if(!req.body.name || !req.body.password){
                res.status(400)
                throw new Error('Please add all fields')
            }
            if(req.body.password.length < 8){
                res.status(400)
                throw new Error('Password must be at least 7 characters')
            }
            if(await User.findOne({name: req.body.name})){
                res.status(400)
                throw new Error('User with that name already exists')
            }
        
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
            const newlyCreatedUser = await User.create({
                name: req.body.name,
                password: hashedPassword,
                privilege: 'user',
                verified: false,
                tokenUsedForSigningUp: req.headers.authorization.split(' ')[1]
            })
            
            res.status(200).json({
                name: newlyCreatedUser.name,
                _id: newlyCreatedUser._id
            })

            
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not Authorized - ' + error)
        }
    } else {
        res.status(400)
        throw new Error('Not Authorized, no token found')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const userThatsLoggingIn = await User.findOne({name: req.body.name})
    if(!userThatsLoggingIn.verified){
        res.status(400)
        throw new Error('Your account is not verified. Please contact the admins to first get your account verified. ')
    }
    if(userThatsLoggingIn && (await bcrypt.compare(req.body.password, userThatsLoggingIn.password))){
        res.status(200).json({
            token: jwt.sign({id: userThatsLoggingIn._id}, process.env.JWT_SECRET),
        })
    } else {
        res.status(400)
        throw new Error('Email or password was not correct')
    }
})

const verifyUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(new ObjectId(req.params.userid), {verified: req.body.verified}, {runValidators: true, new: true})
    res.status(200)
    res.json({
        _id: user._id,
        name: user.name,
        privilege: user.privilege,
        verified: user.verified,
    })
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        name: req.user.name,
        privilege: req.user.privilege,
        verified: req.user.verified
    })
})

const changePrivileges = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.userid)

    if(req.user.privilege!=='admin'){
        if(user.privilege==='admin' || user.privilege==='moderator'){
            res.status(400)
            throw new Error(`You cannot change another admin's or moderator's privileges`)
        }
        if(req.query.privilege==='admin' || req.body.privilege==='moderator'){
            res.status(400)
            throw new Error('You may not elevate a user to admin or moderator privileges')
        }
    }

    user = await User.findOneAndUpdate({_id: req.params.userid}, {privilege: req.body.privilege}, {runValidators: true, new: true})
    user.password = ''
    res.status(200)
    res.json(user)
})

const getUsers = asyncHandler(async (req, res) => {
    var skip, limit, pipeline
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}

    pipeline = []

    if(req.query.privilege){
        pipeline.push({"$match": {
            "privilege": req.query.privilege
        }})
    } 

    pipeline.push(
        { "$facet": {
        "users": [
            { "$skip": skip },
            { "$limit": limit }
        ],
        "count": [
            { "$count": "count" }
        ]}
    })

    const usersQuery = await User.aggregate(pipeline)

    const data = {
        "users": usersQuery[0].users,
        "count": usersQuery[0].count[0]?.count
    }

    data.users.map(user => {
        delete user.password
    })

    console.log(data.users)

    res.status(200)
    res.json(data)
})

module.exports = {
    generateSignUpLink,
    registerUser,
    loginUser,
    getMe,
    verifyUser,
    getUsers,
    changePrivileges
}