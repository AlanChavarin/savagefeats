const asyncHandler = require('express-async-handler')
const Report = require('../models/reportModel')
const ObjectId = require('mongodb').ObjectId

const getReports = asyncHandler(async (req, res) => {
    var skip, limit, find, order
    find = {}
    if(!req.query.limit){limit = 10} 
    else {limit = parseInt(req.query.limit)}
    if(!req.query.page){skip = 0} 
    else {skip = parseInt(req.query.page*limit)}
    order = parseInt(req.query.order)
    !(order==+1 || order===-1) && (order=1)

    if(req.query.status){
        find['status'] = req.query.status
    }

    const pipeline = [
        {"$match": find},
        {"$facet": {
            "reports": [
                { "$skip": skip },
                { "$limit": limit },
                { "$sort": {"createdDate": order}}
            ],
            "count": [
                { "$count": "count" }
            ]
        }}
    ]

    const reportsQuery = await Report.aggregate(pipeline)

    const data = {
        "reports": reportsQuery[0].reports,
        "count": reportsQuery[0].count[0]?.count
    }
    
    res.status(200)
    res.json(data)
})

const getReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(new ObjectId(req.params.reportid))
    if(!report){
        res.status(400)
        throw new Error('report not found')
    }

    res.status(200)
    res.json(report)
})

//this will require a captcha system
const postReport = asyncHandler(async (req, res) => {
    const {subject, body, token} = req.body

    //code to validate captcha token, throw error if it fails

    const secret = process.env.CAPTCHA_KEY
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
    const data = await response.json()
    if(data.success){
        const report = await Report.create({
            subject,
            body,
            status: 'pending'
        })

        res.status(200)
        res.json(report)
    } else {
        res.status(400)
        throw new Error('captcha failed')
    }


    //get rid of the rest of this once captcha is implemented
    const report = await Report.create({
        subject,
        body,
        status: 'pending'
    })

    res.status(200)
    res.json(report)

    
})

const updateReport = asyncHandler(async (req, res) => {

    if(!(await Report.findById(new ObjectId(req.params.reportid)))){
        res.status(400)
        throw new Error('report of the given id was not found')
    }

    const {status} = req.body

    const report = await Report.findByIdAndUpdate(new ObjectId(req.params.reportid), {
        status
    }, {runValidators: true, new: true})

    res.status(200)
    res.json(report)
})

module.exports = {
    getReports,
    getReport,
    postReport, 
    updateReport
}