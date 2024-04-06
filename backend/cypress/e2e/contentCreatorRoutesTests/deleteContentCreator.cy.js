beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("deleteContentCreator test suite", () => {
    it("deleteContentCreator", () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('65e5712cf638b89e146d1bdf')
        })

        //check that its actually deleted

        cy.request({
            failOnStatusCode: false,
            
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')

        })
    })
})