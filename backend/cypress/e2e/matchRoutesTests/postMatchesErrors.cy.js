beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("matches POST routes test suite for errors", () => {
    it("empty name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: '',//error
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
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("empty hero", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'adedadaw',//error
                player1hero: '',//error
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
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })
    

    it("wrong hero name", () => {
        cy.request({
            failOnStatusCode: false,
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
                player2hero: 'Betsy, Skiyuyuyun in the Game',//error
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
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("empty format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Donald Trump',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skiyuyuyun in the Game',
                player2deck: '',
                format: '',//error
                event: 'test empty event',
                link: 'bzh6PrdTZpc',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Quarter Finals', 
            }
        })
        .then(response => {
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("empty link", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Donald Trump',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: '',//error
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Quarter Finals', 
            }
        })
        .then(response => {
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("non existent top 8 round", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Donald Trump',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: '3434teryrthy',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'sdfgjklhndfgjklhndfgjklh', //error
            }
        })
        .then(response => {
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("swiss round given string value", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Donald Trump',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: '3434teryrthy',
                timeStamp: '10137',
                top8: 'false', 
                swissRound: 'hello world!' //error
            }
        })
        .then(response => {
            //console.log(response.status)
            //simply checks for error code starting with 4, meaning an error
            expect(response.status.toString()[0]).to.eq('4')
        })
    })
    
    it("attempts to post match without proper token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer 45690ueri0ohjdrtioyjklofgk}`, //gibberish token
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Player 1 name',
                player1hero: 'Victor Goldmane, High and Mighty',
                player1deck: 'https://www.google.com',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: 'bzh6PrdTZpc',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Finals', 
            }
        })
        .then(response => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })
})
