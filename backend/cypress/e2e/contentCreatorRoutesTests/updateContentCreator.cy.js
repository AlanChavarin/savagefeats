beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("updateContentCreator test suite", () => {
    it("updateContentCreator", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            if(!body.message){
                expect(body).to.have.property('channelid')
            } else {
                expect(body).to.have.property('message')
            }
        })
    })
})