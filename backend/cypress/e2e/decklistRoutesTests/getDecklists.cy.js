
beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})


context("get decklist routes tests suite", () => {
    it("getDecklists", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.decklists)).to.equal(true)
            expect(typeof response.body.count).to.equal('number')

            response.body.decklists.map(decklist => {
                expect(typeof decklist.format).to.equal('string')
            })
        })
    })

    it("getDecklist", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`)
        .then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.event.name).to.equal('January AGE Open')
            expect(body.playerName).to.equal('Alan Chavarin')
            expect(body.decklistLink).to.equal('https://www.google.com')
        })
    })

    it("getDecklistsByEvent", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists/byevent/642b74dcad7c9e49cf97e67f`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body)).to.equal(true)

            response.body.map(decklist => {
                expect(typeof decklist.format).to.equal('string')
                expect(decklist.event._id).to.equal('642b74dcad7c9e49cf97e67f')
            })
        })
    })

    it("getDecklists format=CC", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists?&format=Classic Constructed`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.decklists)).to.equal(true)
            expect(typeof response.body.count).to.equal('number')

            response.body.decklists.map(decklist => {
                expect(decklist.format).to.equal('Classic Constructed')
            })
        })
    })

    it("getDecklists hero=Ser Boltyn, Breaker of Dawn", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists?&hero=Ser Boltyn, Breaker of Dawn`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.decklists)).to.equal(true)
            expect(typeof response.body.count).to.equal('number')

            response.body.decklists.map(decklist => {
                expect(decklist.hero).to.equal('Ser Boltyn, Breaker of Dawn')
            })
        })
    })
})