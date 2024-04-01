beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("matches UPDATE routes test suite", () => {
    it('updates match with new timestamp', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451ab0b7227560bd2e65918`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Michael Hamilton',
                player1hero: 'Lexi, Livewire',
                player1deck: '',
                player2name: 'Colin Swisher',
                player2hero: 'Uzuri, Switchblade',
                player2deck: '',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1805764935',
                twitchTimeStamp: '00h05m03s', //changed by 1 second
                top8: 'false', 
                swissRound: '1', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Michael Hamilton')
            expect(body.player1hero).to.equal('Lexi, Livewire')
            expect(body.player1deck).to.equal('')

            expect(body.player2name).to.equal('Colin Swisher')
            expect(body.player2hero).to.equal('Uzuri, Switchblade')
            expect(body.player2deck).to.equal('')

            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('Pro Tour Baltimore')
            expect(body.link).to.equal('1805764935')

            expect(body.twitchTimeStamp).to.equal('00h05m03s')
            expect(body.top8).to.equal(false)
            expect(body.swissRound).to.equal(1)

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("Pro Tour Baltimore")
        })
    })

    it('updates match with new decklists', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451ab0b7227560bd2e65918`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Michael Hamilton',
                player1hero: 'Lexi, Livewire',
                player1deck: 'https://www.google.com',
                player2name: 'Colin Swisher',
                player2hero: 'Uzuri, Switchblade',
                player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'Pro Tour Baltimore',
                twitch: true,
                link: '1805764935',
                twitchTimeStamp: '00h05m02s', 
                top8: 'false', 
                swissRound: '1', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Michael Hamilton')
            expect(body.player1hero).to.equal('Lexi, Livewire')
            expect(body.player1deck).to.equal('https://www.google.com')

            expect(body.player2name).to.equal('Colin Swisher')
            expect(body.player2hero).to.equal('Uzuri, Switchblade')
            expect(body.player2deck).to.equal('https://www.youtube.com')

            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('Pro Tour Baltimore')
            expect(body.link).to.equal('1805764935')

            expect(body.twitchTimeStamp).to.equal('00h05m02s')
            expect(body.top8).to.equal(false)
            expect(body.swissRound).to.equal(1)

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("Pro Tour Baltimore")
        })
    })

    it('updates match with new decklists and checks if those decklists are also updated for other matches featuring the same player within the same event', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/6451ab0b7227560bd2e65918`,
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
                top8Round: 'Finals', 
            }
        }).then((response) => {
            // first check the update works on the match itself
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Mara Faris')
            expect(body.player1hero).to.equal('Dromai, Ash Artist')
            expect(body.player1deck).to.equal('https://www.google.com')

            expect(body.player2name).to.equal('Michael Feng')
            expect(body.player2hero).to.equal('Oldhim, Grandfather of Eternity')
            expect(body.player2deck).to.equal('https://www.youtube.com')
            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('Pro Tour Baltimore')
            expect(body.link).to.equal('1807645052')

            expect(body.twitchTimeStamp).to.equal('09h03m23s')
            expect(body.top8).to.equal(true)
            expect(body.top8Round).to.equal('Finals')

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("Pro Tour Baltimore")
        })

        //then check all other matches with mara or michael in them
        cy.request({
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/byevent/Pro Tour Baltimore`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // first check the update works on the match itself
            expect(response.status).to.equal(200)
            const body = response.body

            body.map(match => {

                //console.log(match.player1name)
                if(match.player1name == 'Mara Faris'){
                    expect(match.player1deck).to.equal('https://www.google.com')
                }

                if(match.player2name == 'Mara Faris'){
                    expect(match.player2deck).to.equal('https://www.google.com')
                }

                if(match.player1name == 'Michael Feng'){
                    expect(match.player1deck).to.equal('https://www.youtube.com')
                }

                if(match.player2name == 'Michael Feng'){
                    expect(match.player2deck).to.equal('https://www.youtube.com')
                }
            })
        })
    })

    
})