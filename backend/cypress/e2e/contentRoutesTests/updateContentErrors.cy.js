beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("updateContent test suite", () => {
    it("updateContentRelatedData, no token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("updateContentRelatedData, wrong token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer geshghfghhurtyujftyhk`,
                'Content-Type': 'application/json'
            },
            body: {
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("updateContentRelatedData, user without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })
})