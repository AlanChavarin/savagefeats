beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context('post decklist errors tests suite', () => {
    it("attempts to update decklist without format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-type': 'application/json'
            },
            body: {
                playerName: 'Alan Chavarin (edit)',
                decklistLink: 'https://www.google.com (edit)',
                placement: 2,
                placementRangeEnding: 4, 
                format: '',
                hero: 'Levia, Shadowborn Abomination',
                event: 'Pro Tour Baltimore'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("attempts to update decklist with fake format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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

    it("attempts to update decklist with nonsense bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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

    it("attempts to update decklist without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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

    it("attempts to update decklist without any headers", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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

    it("attempts to update decklist without real tournament name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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

    it("attempts to update decklist without real hero name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
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