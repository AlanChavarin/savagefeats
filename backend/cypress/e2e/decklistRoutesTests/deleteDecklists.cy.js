
beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})


context("get decklist routes tests suite", () => {
    it("delete decklist", () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            expect(response.status).to.equal(200)
        })

        //make sure its actually deleted and doesnt exist
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}decklists/65e56186bb2a4338f25fafef`
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})