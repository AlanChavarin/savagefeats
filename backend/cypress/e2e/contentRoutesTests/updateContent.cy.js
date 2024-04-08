beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})


context("updateContent test suite", () => {
    it("updateContentRelatedData", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content/66136d2b241b13d6900d3744`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'Application/json'
            },
            body: {
                relatedEventid: ['64372c7407ddf3c55ea61abc', '64375ae9c75a6d2e48f3c3fa'],
                relatedMatchid: ['643075145159acfe8f90f015', '643075505159acfe8f90f03c'],
                relatedDecklistid: '65e561e7bb2a4338f25faff5'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.type).to.equal('decktech'),
            expect(body.relatedEventid).to.eql(['64372c7407ddf3c55ea61abc', '64375ae9c75a6d2e48f3c3fa'])
            expect(body.relatedMatchid).to.eql(['643075145159acfe8f90f015', '643075505159acfe8f90f03c'])
            expect(body.relatedDecklistid).to.eql('65e561e7bb2a4338f25faff5')

            expect(body).to.have.property('videoid')
            expect(body).to.have.property('publishedAt')
            expect(body).to.have.property('parentContentCreatorYoutubeChannelid')
            expect(body).to.have.property('parentContentCreatorid')
            expect(body).to.have.property('title')
            expect(body).to.have.property('description')
            expect(body).to.have.property('channelTitle')
        })
    })
})