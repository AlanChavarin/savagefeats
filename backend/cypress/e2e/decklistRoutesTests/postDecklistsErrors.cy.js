beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context('post decklist errors tests suite', () => {
    it("attempts to post decklist without format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist with fake format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'rgjksdfgjklnh',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist with fake format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'rgjksdfgjklnh',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist with nonsense bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer rgdhdfghjfghjk`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'Classic Constructed',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'Classic Constructed',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist without any headers", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'Classic Constructed',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist without real tournament name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'Classic Constructed',
                hero: 'Ser Boltyn, Breaker of Dawn',
                event: 'eftghoipeorsihjtgklodthjnmlfdtgyhj' //gibberish
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to post decklist without real hero name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin',
                decklistLink: 'https://www.google.com',
                placement: 1,
                format: 'Classic Constructed',
                hero: 'srthplkdghjml;fghjk',
                event: 'test empty event'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

})