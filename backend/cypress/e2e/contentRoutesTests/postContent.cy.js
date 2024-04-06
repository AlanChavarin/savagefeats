beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("postContent test suite", () => {
    it("postContent, videoid given only", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'xuBP1TjAb-w',
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            expect(body.videoid).to.equal('xuBP1TjAb-w')
            expect(body).to.have.property('publishedAt')
            expect(body).to.have.property('parentContentCreatorYoutubeChannelid')
            expect(body).to.have.property('parentContentCreatorid')
            expect(body).to.have.property('title')
            expect(body).to.have.property('description')
            expect(body).to.have.property('channelTitle')
        })
    })

    it("postContent, videoid, type", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'xuBP1TjAb-w',
                type: 'decktech'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            expect(body.videoid).to.equal('xuBP1TjAb-w')
            expect(body).to.have.property('publishedAt')
            expect(body).to.have.property('parentContentCreatorYoutubeChannelid')
            expect(body).to.have.property('parentContentCreatorid')
            expect(body).to.have.property('title')
            expect(body).to.have.property('description')
            expect(body).to.have.property('channelTitle')

            expect(body.equal).to.equal('decktech')
        })
    })

    
})
