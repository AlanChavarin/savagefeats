beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("updateReport test suite", () => {
    it("updateReport status", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                status: "fixed"
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("fixed")
        })
    })
})