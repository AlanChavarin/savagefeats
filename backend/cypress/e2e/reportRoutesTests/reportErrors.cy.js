beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("reports tests suite", () => {
    it("updateReport status, no header", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`,
            body: {
                status: "fixed"
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("updateReport status, wrong token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`,
            headers: {
                Authorization: `Bearer 4wertertyhrftyjfgyukgjkhjklhjkhjkl`,
                'Content-Type': 'application/json'
            },
            body: {
                status: "fixed"
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("updateReport status, no permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                status: "fixed"
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("updateReport status, non existent status", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                status: "fsrftgkodfgnmhljkdfghjmnfghj" //non sense status
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("updateReport status, non existent report", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}reports/6614aaedada053f3e65646ed`, //fake id
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                status: "fixed" //non sense status
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })
})