before(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("getContent tests suite", () => {
    it("getContent", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('66136d2b241b13d6900d3744')
        })
    })

    it("getAllContent", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}content/`)
        .then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            expect(Array.isArray(body)).to.equal(true)
            body.map(content => {
                expect(typeof content._id).to.equal('string')
            })
        })
    })
})