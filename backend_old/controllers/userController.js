const User = require('../models/userModel')

const getUsers = async (req, res) => {
    const data = await User.find()

    res.status(200)
    res.json(data)
}

const postUser = async (req, res) => {
    const {name, age} = req.body
    const data = await User.create({
        name,
        age
    })

    res.status(200)
    res.json(data)
}

module.exports = {
    getUsers,
    postUser
}