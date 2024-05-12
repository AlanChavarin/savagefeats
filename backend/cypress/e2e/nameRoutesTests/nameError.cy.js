beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("names tests suite", () => {
    it("getNameLinkPairsbyEvent, no event name given", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/namelinkpairsbyEvent`,
        })
        .then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("getNameLinkPairsbyEvent, wrong name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/namelinkpairsbyEvent?&event=suiodfghiudofgsh89345345897345knmxcvbposdjghuidfghrh45y`,
        })
        .then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('postName, no header', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name2`,
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('postName, wrong token', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name2`,
            headers: {
                Authorization: `Bearer fgkdjndjkfghndfghj`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('postName, no permissions', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name2`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('postName, already existing name', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('postName, no name given', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('deleteName, non existent name', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/ergi08usdfgh890dfgruh89rthjseirhng`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('deleteName, no header', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name`,
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('deleteName, bad token', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name`,
            headers: {
                Authorization: `Bearer sfghjdfdfghfghjghjkl`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it('deleteName, no permimssions to delete', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}names/Test Name`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })
})