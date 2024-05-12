beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("names tests suite", () => {
    it("getNames", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}names`)
        .then(response => {
            expect(response.status).to.equal(200)
            response.body.map(name => {
                expect(typeof name.name).to.equal('string')
            })
        })
    })

    it("getNameLinkPairsbyEvent", () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/namelinkpairsbyEvent?&event=January AGE Open&format=Classic Constructed`,
        })
        .then(response => {
            expect(response.status).to.equal(200)
            for(let key in response.body){
                expect(typeof key).to.equal('string')
                expect(typeof response.body[key]).to.equal('string')
            }
        })
    })

    it('postName', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name2`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            expect(body.name).to.equal('Test Name2')
            expect(body).to.have.property('_id')
        })
    })

    it('deleteName', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status).to.equal(200)
        })
    })
})