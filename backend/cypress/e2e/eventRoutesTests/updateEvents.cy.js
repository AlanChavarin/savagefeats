beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("event put/update test suite", () => {
    it("update Pro Tour Baltimore's name to be Pro Tour San Diego", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}events/6451413c7227560bd2e658f3`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
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
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.name).to.equal("Pro Tour San Diego")
            expect(body.location).to.equal("San Diego")
            expect(body.format).to.eql(["Classic Constructed", "Draft"])
            expect(new Date(body.startDate)).to.eql(new Date("2024-04-28"))
            expect(new Date(body.endDate)).to.eql(new Date("2024-04-30"))
            expect(body.dayRoundArr).to.eql([7, 14])
            expect(body.top8Day).to.equal(true)
            expect(body.backgroundPosition).to.equal(24)
        })

        //now check that this change has been propigated to all embedded event data in their respective matches

        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches/byevent/6451413c7227560bd2e658f3`).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            body.map(match => {
                expect(match.event.name).to.equal("Pro Tour San Diego")
                expect(match.event.location).to.equal("San Diego")
                expect(match.event.format).to.eql(["Classic Constructed", "Draft"])
                expect(new Date(match.event.startDate)).to.eql(new Date("2024-04-28"))
                expect(new Date(match.event.endDate)).to.eql(new Date("2024-04-30"))
                expect(match.event.dayRoundArr).to.eql([7, 14])
                expect(match.event.top8Day).to.equal(true)
            })
        })
    })
})