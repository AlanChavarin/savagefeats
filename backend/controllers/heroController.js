const asyncHandler = require('express-async-handler')
const Hero = require('../models/heroModel')

const getHeroes = asyncHandler(async (req, res) => {
    let heroes

    if(req.query.adult === 'true'){
        heroes = await Hero.find({young: false})
    } else if(req.query.adult === 'false'){
        heroes = await Hero.find({young: true})
    } else {
        heroes = await Hero.find({})
    }

    res.status(200)
    res.json(heroes)
})

const getHeroNames = asyncHandler(async (req, res) => {
    // const heroes = await Hero.find({}, {'name': 1, _id: 0})
    // res.status(200).json(heroes)

    let heroNames

    if(req.query.adult === 'true'){
        heroNames = await Hero.find({young: false}, {'name': 1, _id: 0})
    } else if(req.query.adult === 'false'){
        heroNames = await Hero.find({young: true}, {'name': 1, _id: 0})
    } else {
        heroNames = await Hero.find({}, {'name': 1, _id: 0})
    }

    res.status(200)
    res.json(heroNames)
})

const getHero = asyncHandler(async(req, res) => {
    console.log(req.params)
    const hero = await Hero.findOne({_id: req.params.heroid})
    res.status(200).json(hero)
})

const postHero = asyncHandler(async (req, res) => {
    console.log(req.body.hero, req.body.young)

    if(!req.body.hero){
        res.status(400)
        throw new Error('Please enter a hero name')
    }

    const hero = await Hero.create({
        name: req.body.hero,
        class: req.body.class,
        talent: req.body.talent,
        young: req.body.young
    })

    res.status(200).json(hero)
})

const updateHero = asyncHandler(async (req, res) => {
    res.status(200).json(req.body)
})

const deleteHero = asyncHandler(async (req, res) => {
    if(!req.body.hero){
        res.status(400)
        throw new Error('Please enter a hero name')
    }

    const hero = await Hero.deleteOne({
        name: req.body.hero
    })

    res.status(200).json(hero)
})

module.exports = {
    getHeroes,
    getHeroNames,
    getHero,
    postHero,
    deleteHero,
    updateHero,
}


// const getAdultHeroes = asyncHandler(async (req, res) => {
//     const heroes = await Hero.find({young: false})
//     res.status(200).json(heroes)
// })

// const getYoungHeroes = asyncHandler(async (req, res) => {
//     const heroes = await Hero.find({young: true})
//     res.status(200).json(heroes)
// })

// const getHeroNames = asyncHandler(async (req, res) => {
//     const heroes = await Hero.find({}, {'name': 1, _id: 0})
//     res.status(200).json(heroes)
// })

// const getAdultHeroNames = asyncHandler(async (req, res) => {
//     const heroes = await Hero.find({young: false}, {'name': 1, _id: 0})
//     res.status(200).json(heroes)
// })

// const getYoungHeroNames = asyncHandler(async (req, res) => {
//     const heroes = await Hero.find({young: true}, {'name': 1, _id: 0})
//     res.status(200).json(heroes)
// })