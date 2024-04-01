const propertiesIExpectTobeStrings = [
    '_id', 
    'player1name', 
    'player1deck', 
    'player1hero', 
    'player2name', 
    'player2deck', 
    'player2hero',
    'link',
]

const propertiesIExpectToSimplyExist = [
    'event',
    'top8',
    'swissRound',
    'top8Round',
    'twitch',
    'timeStamp',
    'twitchTimeStamp',
    'date',
    'format'
]

const eventPropertiesIExpectToBeStrings = [
    "_id",
    "name",
    "location",
    "format",
    "startDate",
]

const eventPropertiesIExpectToExist = [
    //'endDate',
    //'notATypicalTournamentStructure',
    //'dayRoundArr',
    //'top8Day'
]

const universalMatchResponsePropertyChecker = (response) => {
    expect(response.body).to.have.property("matches")
    expect(response.body).to.have.property("count")
    expect(response.body).to.have.property("matches").that.is.an('array')
    expect(response.body).to.have.property("count").that.is.a('number')
    //string expectations

    response.body.matches.forEach(match => {
        propertiesIExpectTobeStrings.map(property => {
            expect(match).to.have.property(property).that.is.a('string')
        })

        propertiesIExpectToSimplyExist.map(property => {
            expect(match).to.have.property(property)
        })

        eventPropertiesIExpectToBeStrings.map(property => {
            expect(match.event).to.have.property(property).that.is.a('string')
        })

        eventPropertiesIExpectToExist.map(property => {
            expect(match.event).to.have.property(property)
        })

    })
}

const universalMatchPostChecker = (response) => {
    const match = response.body
    propertiesIExpectTobeStrings.map(property => {
        expect(match).to.have.property(property).that.is.a('string')
    })

    propertiesIExpectToSimplyExist.map(property => {
        expect(match).to.have.property(property)
    })

    eventPropertiesIExpectToBeStrings.map(property => {
        expect(match.event).to.have.property(property).that.is.a('string')
    })

    eventPropertiesIExpectToExist.map(property => {
        expect(match.event).to.have.property(property)
    })
}

module.exports = {
    universalMatchResponsePropertyChecker,
    universalMatchPostChecker
}