// beforeEach(() => {
//     // restores database before each test runs 
//     const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
//     cy.exec(resetMongoDBCommand)
// })

context("getContentCreator test suite", () => {
    it("getContentCreators", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}contentcreators`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body)).to.equal(true)

            response.body.map(contentCreator => {
                expect(typeof contentCreator._id).to.equal('string')
            })
        })
    })

    it("getContentCreator", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal("65e5712cf638b89e146d1bdf")
        })
    })

    
})