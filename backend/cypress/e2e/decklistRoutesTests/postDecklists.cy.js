beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("post decklist routes tests suite", () => {
    it("postDecklist", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                hero: 'Ser Boltyn, Breaker of Dawn',
                format: 'Classic Constructed',
                event: 'test empty event'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.playerName).to.equal('Alan Chavarin'),
            expect(body.decklistLink).to.equal('https://www.google.com'),
            expect(body.placement).to.equal(1),
            expect(body.hero).to.equal('Ser Boltyn, Breaker of Dawn'),
            expect(body.format).to.equal('Classic Constructed'),
            expect(body.event.name).to.equal('test empty event')
        })
    })

    it("postDecklist with placement range", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 5,
                placementRangeEnding: 8,
                hero: 'Ser Boltyn, Breaker of Dawn',
                format: 'Classic Constructed',
                event: 'test empty event'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.playerName).to.equal('Alan Chavarin'),
            expect(body.decklistLink).to.equal('https://www.google.com'),
            expect(body.placement).to.equal(5),
            expect(body.placementRangeEnding).to.equal(8)
            expect(body.hero).to.equal('Ser Boltyn, Breaker of Dawn'),
            expect(body.format).to.equal('Classic Constructed'),
            expect(body.event.name).to.equal('test empty event')
        })
    })
})