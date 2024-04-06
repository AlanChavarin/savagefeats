beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("updateContentCreator test suite", () => {

    it("updateContentCreator wrong channelid given", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators/qw409t8yisehrtuogrtyujfyuik`, //gibberis
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("updateContentCreator no bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators/65e5712cf638b89e146d1bdf`,
            headers: {
                //nothing
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("updateContentCreator wrong bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer eotikhodfgkhjdfghjk`, //gibberish
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("updateContentCreator user without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`, //gibberish
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

})