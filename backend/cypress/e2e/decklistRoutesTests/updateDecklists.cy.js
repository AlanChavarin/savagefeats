beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("post decklist routes tests suite", () => {
    it("updateDecklist to change name", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin (edit)',
                decklistLink: 'https://www.google.com (edit)',
                placement: 2,
                placementRangeEnding: 4, 
                hero: 'Levia, Shadowborn Abomination',
                format: 'Living Legend',
                event: 'Pro Tour Baltimore'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.playerName).to.equal('Alan Chavarin (edit)'),
            expect(body.decklistLink).to.equal('https://www.google.com (edit)'),
            expect(body.placement).to.equal(2),
            expect(body.placementRangeEnding).to.equal(4),
            expect(body.hero).to.equal('Levia, Shadowborn Abomination'),
            expect(body.format).to.equal('Living Legend'),
            expect(body.event.name).to.equal('Pro Tour Baltimore')
        })
    })

})