beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("postContentCreator test suite", () => {
    it("postContentCreator", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}contentCreators`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                channelid: 'UCQW-Jql3r6YlBxl1JzJmFJw',
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body
            expect(body.channelid).to.equal('UCQW-Jql3r6YlBxl1JzJmFJw')
            expect(body).to.have.property('title')
            expect(body).to.have.property('customUrl')
            expect(body).to.have.property('description')
            expect(body).to.have.property('publishedAt')
            expect(body).to.have.property('profilePictureDefault')
            expect(body).to.have.property('profilePictureMedium')
            expect(body).to.have.property('profilePictureHigh')
            expect(body).to.have.property('etag')
            
        })
    })

    
})