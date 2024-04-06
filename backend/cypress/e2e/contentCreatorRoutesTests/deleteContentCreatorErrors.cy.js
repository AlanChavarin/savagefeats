beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("deleteContentCreator errors test suite", () => {
    it("deleteContentCreator with wrong channelid", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b19e144d1bd2`, //wrong channelid
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("deleteContentCreator with no bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`,
            headers: {
                //no token
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("deleteContentCreator with wrong bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer 45typojrtydpiohjkfrhklpt;jmfl;ghtuyk`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("deleteContentCreator without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentcreators/65e5712cf638b89e146d1bdf`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})