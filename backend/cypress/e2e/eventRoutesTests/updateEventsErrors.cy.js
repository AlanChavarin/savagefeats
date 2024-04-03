beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("event put/update test suite", () => {
    it("update Pro Tour Baltimore's name to have no name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events/6451413c7227560bd2e658f3`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: "",
                location: "San Diego",
                format: ["Classic Constructed", "Draft"],
                startDate: "2024-04-28",
                endDate: "2024-04-30",
                dayRoundArr: [7, 14],
                top8Day: true,
                backgroundPosition: 24,
            }
        })
        .then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("update event with without a proper token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events/6451413c7227560bd2e658f3`,
            headers: {
                Authorization: `Bearer eroigujdosfh}`, //gibberish token
                'Content-Type': 'application/json'
            },
            body: {
                name: "Pro Tour San Diego",
                location: "San Diego",
                format: ["Classic Constructed", "Draft"],
                startDate: "2024-04-28",
                endDate: "2024-04-30",
                dayRoundArr: [7, 14],
                top8Day: true,
                backgroundPosition: 24,
            }
        })
        .then(response => {
            //expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("update event with a proper token that doesnt have the right permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events/6451413c7227560bd2e658f3`,
            headers: {
                Authorization: `Bearer ${Cypress.env.CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER}`, //user without permissions
                'Content-Type': 'application/json'
            },
            body: {
                name: "Pro Tour San Diego",
                location: "San Diego",
                format: ["Classic Constructed", "Draft"],
                startDate: "2024-04-28",
                endDate: "2024-04-30",
                dayRoundArr: [7, 14],
                top8Day: true,
                backgroundPosition: 24,
            }
        })
        .then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})