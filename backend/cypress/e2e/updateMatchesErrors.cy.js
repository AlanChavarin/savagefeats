beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("matches PUT/UPDATE routes test suite for errors", () => {
    it("empty name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: '',
                player1deck: 'https://www.google.com',
                player2name: '',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1807645052',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("non existant final stage round name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artist',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1807645052',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'serthiodfghjuodfgjh', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("wrong hero", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artistwd',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternitywdwd',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1807645052',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("wrong format", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artist',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructweweweawet4356ed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1807645052',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("empty twitch link", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artist',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("empty youtube link", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artist',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: false,
                link: '',
                timeStamp: '23',
                twitchTimeStamp: '', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    it("non-existant event name", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451cde07227560bd2e65c57`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Mara Faris',
                player1hero: 'Dromai, Ash Artist',
                player1deck: 'https://www.google.com',
                player2name: 'Michael Feng',
                player2hero: 'Oldhim, Grandfather of Eternity',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimoresdwd', //gibberish
                twitch: true,
                link: '1807645052',
                twitchTimeStamp: '09h03m23s', 
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status.toString()[0]).to.eq('4')
        })
    })

    
})
