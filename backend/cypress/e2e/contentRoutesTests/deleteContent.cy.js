beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("deleteContent test suite", () => {
    it("deleteContent", () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('66136d2b241b13d6900d3744')
        })

        //then check the content no longer exists
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})