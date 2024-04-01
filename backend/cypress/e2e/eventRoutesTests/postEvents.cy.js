beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("events POST routes test suite", () => {
    it("post pro tour style event", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Pro Tour Tijuana',
                location: 'Tijuana, MX',
                official: true,
                format: ['Classic Constructed', 'Draft'],
                formatDescription: 'WTR',
                venue: 'Tijuana Venue 234243',
                coincidingEvents: ['660a1c7db8c4adfa789bc1f3'],
                officialDetails: 'Pro Tour Tijuana Details',
                signUpLink: 'https://www.google.com',
                liveStream: 'https://www.youtube.com',
                startDate: '2024-03-22',
                endDate: '2024-03-24',
                notATypicalTournamentStructure: false,
                dayRoundArr: [7, 14],
                top8Day: true,
            }
        })
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal('Pro Tour Tijuana')
            expect(response.body.location).to.equal('Tijuana, MX')
            expect(response.body.official).to.equal(true)
            expect(response.body.format).to.eql(['Classic Constructed', 'Draft'])
            expect(response.body.formatDescription).to.equal('WTR')
            expect(response.body.venue).to.equal('Tijuana Venue 234243')
            expect(response.body.coincidingEvents).to.eql(['660a1c7db8c4adfa789bc1f3'])
            expect(response.body.officialDetails).to.equal('Pro Tour Tijuana Details')
            expect(response.body.signUpLink).to.equal('https://www.google.com')
            expect(response.body.liveStream).to.equal('https://www.youtube.com')
            expect(new Date(response.body.startDate)).to.eql(new Date('2024-03-22'))
            expect(new Date(response.body.endDate)).to.eql(new Date('2024-03-24'))
            expect(response.body.notATypicalTournamentStructure).to.equal(false)
            expect(response.body.dayRoundArr).to.eql([7, 14])
            expect(response.body.top8Day).to.equal(true)
        })
    })

    it("post battle hardened style event", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Battle Hardened Tijuana',
                location: 'Tijuana, MX',
                official: true,
                format: ['Classic Constructed'],
                venue: 'Tijuana Venue 234243',
                signUpLink: 'https://www.google.com',
                startDate: '2024-03-22',
                notATypicalTournamentStructure: false,
            }
        })
        .then((response) => {
            expect(response.status).to.equal(200)

            expect(response.body.name).to.equal('Battle Hardened Tijuana')
            expect(response.body.location).to.equal('Tijuana, MX')
            expect(response.body.official).to.equal(true)
            expect(response.body.format).to.eql(['Classic Constructed'])
            expect(response.body.venue).to.equal('Tijuana Venue 234243')
            expect(response.body.signUpLink).to.equal('https://www.google.com')
            expect(new Date(response.body.startDate)).to.eql(new Date('2024-03-22'))
            expect(response.body.notATypicalTournamentStructure).to.equal(false)
        })
    })
})