beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context.skip("matches POST routes test suite for errors", () => {
    it("empty name", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: '',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: 'bzh6PrdTZpc',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Quarter Finals', 
            }
        })
        .then(response => {
            console.log(response.status)
            expect(response.status).to.eq(400)
        })
    })
    
})
