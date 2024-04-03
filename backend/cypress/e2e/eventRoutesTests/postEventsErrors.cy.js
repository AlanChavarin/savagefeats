beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("event put/update test suite", () => {
    it("post pro tour style event without a name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: '',
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("post pro tour style event without a location", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Pro Tour Tijuana',
                location: '',
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("post pro tour style event without a format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Pro Tour Tijuana',
                location: '',
                official: true,
                format: '',
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("post pro tour style event without a bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("post pro tour style event with non sense bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer 3ty089drtujhdftgihojn`,
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
    
    it("post pro tour style event with permissionless user bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
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
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("post pro tour style event with messed up dayRoundArr entry", () => {
        cy.request({
            failOnStatusCode: false,
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
                dayRoundArr: "efghljkdrftgh", //nonsense
                top8Day: true,
            }
        })
        .then((response) => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    
})