beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("postContentCreator test suite", () => {
    it("postContentCreator no channelid given", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                //nothing in the body
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContentCreator wrong channelid given", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                channelid: '3q4590weryighofgj', //gibberish
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContentCreator no bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                //nothing
                'Content-Type': 'application/json'
            },
            body: {
                channelid: 'UCQW-Jql3r6YlBxl1JzJmFJw',
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContentCreator wrong bearer token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                'Authorization': `Bearer eotikhodfgkhjdfghjk`, //gibberish
                'Content-Type': 'application/json'
            },
            body: {
                channelid: 'UCQW-Jql3r6YlBxl1JzJmFJw',
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContentCreator user without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`, //gibberish
                'Content-Type': 'application/json'
            },
            body: {
                channelid: 'UCQW-Jql3r6YlBxl1JzJmFJw',
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    


    
})