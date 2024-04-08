beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("deleteContent test suite", () => {
    it("deleteContent, no token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("deleteContent, wrong token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer geshghfghhurtyujftyhk`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("deleteContent, user without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})