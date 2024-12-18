beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("matches POST routes test suite", () => {
    it('creates a new match 1', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Player 1 name',
                player1hero: 'Victor Goldmane, High and Mighty',
                //player1deck: 'https://www.google.com',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                //player2deck: 'https://www.youtube.com',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: 'bzh6PrdTZpc',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Player 1 name')
            expect(body.player1hero).to.equal('Victor Goldmane, High and Mighty')
            //expect(body.player1deck).to.equal('https://www.google.com')

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            //expect(body.player2deck).to.equal('https://www.youtube.com')

            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('test empty event')
            expect(body.link).to.equal('bzh6PrdTZpc')

            expect(body.timeStamp).to.equal(10137)
            expect(body.top8).to.equal(true)
            expect(body.top8Round).to.equal('Finals')

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("test empty event")
            expect(event.location).to.equal("Los Angeles, CA")
            expect(event.format).to.deep.equal(["Classic Constructed"])
            expect(event.official).to.equal(true)
            expect(event.startDate.slice(0, 10)).to.equal("2024-03-22")
        })
    })

    it('creates a new match 2', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Player 1 name',
                player1hero: 'Victor Goldmane, High and Mighty',
                //player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                //player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                link: 'bzh6PrdTZpc',
                timeStamp: '10137',
                top8: 'true', 
                top8Round: 'Quarter Finals', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Player 1 name')
            expect(body.player1hero).to.equal('Victor Goldmane, High and Mighty')
            //expect(body.player1deck).to.equal('')

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            //expect(body.player2deck).to.equal('')

            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('test empty event')
            expect(body.link).to.equal('bzh6PrdTZpc')

            expect(body.timeStamp).to.equal(10137)
            expect(body.top8).to.equal(true)
            expect(body.top8Round).to.equal('Quarter Finals')

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("test empty event")
            expect(event.location).to.equal("Los Angeles, CA")
            expect(event.format).to.deep.equal(["Classic Constructed"])
            expect(event.official).to.equal(true)
            expect(event.startDate.slice(0, 10)).to.equal("2024-03-22")
        })
    })

    it("creates 18 new matches for a pt style event", () => {

        const names =  ['Milo Velasquez', 'Aayan Carey', 'Musa Odom', 'Libby George', 'Enya Case', 'Alexia Sims', 'Trystan Wade', 'Roy Steele', 'Lena Tran', 'Haroon Weiss', 'Neha Winter', 'Aamir Russell', 'Kelvin Doherty', 'Kamil Haines', 'Aoife Reed', 'Maisey Fitzgerald', 'Aya Burgess', 'Iestyn Beltran', 'Amaan Andrade', 'Saif Cain']
        const heroes = ['Bravo, Showstopper', 'Dorinthea Ironsong', 'Katsu, the Wanderer', 'Rhinar, Reckless Rampage', 'Dash, Inventor Extraordinaire', 'Azalea, Ace in the Hole', 'Viserai, Rune Blood', 'Kano, Dracai of Aether', 'Ser Boltyn, Breaker of Dawn', 'Prism, Sculptor of Arc Light', 'Levia, Shadowborn Abomination', 'Chane, Bound by Shadow', 'Oldhim, Grandfather of Eternity', 'Lexi, Livewire', 'Briar, Warden of Thorns', 'Bravo, Star of the Show', 'Iyslander, Stormbind', 'Dromai, Ash Artist', 'Fai, Rising Rebellion', 'Arakni, Huntsman', 'Riptide, Lurker of the Deep', 'Uzuri, Switchblade', 'Prism, Awakener of Sol', 'Vynnset, Iron Maiden', 'Teklovossen, Esteemed Magnate', "Maxx 'The Hype' Nitro", 'Dash I/O', 'Kayo, Armed and Dangerous', 'Kassai of the Golden Sand', 'Betsy, Skin in the Game', 'Victor Goldmane, High and Mighty', 'Olympia, Prized Fighter']
        const top8Rounds = ['Quarter Finals', 'Semi Finals', 'Finals']

        
        for(let i = 0; i < 14; i++){
            cy.request({
                method: 'POST',
                url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    player1name: names[i],
                    player1hero: heroes[i],
                    //player1deck: 'https://www.google.com',
                    player2name: names[13-i],
                    player2hero: heroes[13-i],
                    //player2deck: 'https://www.youtube.com',
                    format: 'Classic Constructed',
                    event: 'example pro tour event',
                    link: 'bzh6PrdTZpc',
                    timeStamp: '10137',
                    top8: 'false', 
                    swissRound: (i+1)
                }
            })
            .then(response => {
                expect(response.status).to.equal(200)
                const body = response.body

                expect(body.player1name).to.equal(names[i])
                expect(body.player1hero).to.equal(heroes[i])
                //expect(body.player1deck).to.equal('https://www.google.com')

                expect(body.player2name).to.equal(names[13-i])
                expect(body.player2hero).to.equal(heroes[13-i])
                //expect(body.player2deck).to.equal('https://www.youtube.com')

                
                expect(body.format).to.equal('Classic Constructed')
                expect(body.event.name).to.equal('example pro tour event')
                expect(body.link).to.equal('bzh6PrdTZpc')

                expect(body.timeStamp).to.equal(10137)
                expect(body.top8).to.equal(false)
                expect(body.swissRound).to.equal(i+1)

                const event = body.event
                //test correct event entered
                expect(event.name).to.equal("example pro tour event")
                expect(event.location).to.equal("Los Angeles, CA")
                expect(event.format).to.deep.equal(["Classic Constructed", "Draft"])
                expect(event.official).to.equal(true)
                expect(event.startDate.slice(0, 10)).to.equal("2024-01-01")
                expect(event.endDate.slice(0, 10)).to.equal("2024-01-04")
            })
        }

        top8Rounds.map((round, i) => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    player1name: names[i],
                    player1hero: heroes[i],
                    //player1deck: 'https://www.google.com',
                    player2name: names[13-i],
                    player2hero: heroes[13-i],
                    //player2deck: 'https://www.youtube.com',
                    format: 'Classic Constructed',
                    event: 'example pro tour event',
                    link: 'bzh6PrdTZpc',
                    timeStamp: '10137',
                    top8: 'true', 
                    top8Round: round
                }
            })
            .then(response => {
                expect(response.status).to.equal(200)
                const body = response.body

                expect(body.player1name).to.equal(names[i])
                expect(body.player1hero).to.equal(heroes[i])
                //expect(body.player1deck).to.equal('https://www.google.com')

                expect(body.player2name).to.equal(names[13-i])
                expect(body.player2hero).to.equal(heroes[13-i])
                //expect(body.player2deck).to.equal('https://www.youtube.com')

                
                expect(body.format).to.equal('Classic Constructed')
                expect(body.event.name).to.equal('example pro tour event')
                expect(body.link).to.equal('bzh6PrdTZpc')

                expect(body.timeStamp).to.equal(10137)
                expect(body.top8).to.equal(true)
                expect(body.top8Round).to.equal(round)

                const event = body.event
                //test correct event entered
                expect(event.name).to.equal("example pro tour event")
                expect(event.location).to.equal("Los Angeles, CA")
                expect(event.format).to.deep.equal(["Classic Constructed", "Draft"])
                expect(event.official).to.equal(true)
                expect(event.startDate.slice(0, 10)).to.equal("2024-01-01")
                expect(event.endDate.slice(0, 10)).to.equal("2024-01-04")
            })
        })
    })

    it('creates a new match using a twitch link', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Player 1 name',
                player1hero: 'Victor Goldmane, High and Mighty',
                //player1deck: '',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                //player2deck: '',
                format: 'Classic Constructed',
                event: 'test empty event',
                twitch: true,
                link: '1805764935',
                twitchTimeStamp: '6h14m27s',
                top8: 'true', 
                top8Round: 'Quarter Finals', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Player 1 name')
            expect(body.player1hero).to.equal('Victor Goldmane, High and Mighty')
            //expect(body.player1deck).to.equal('')

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            //expect(body.player2deck).to.equal('')

            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('test empty event')
            expect(body.twitch).to.equal(true)
            expect(body.link).to.equal('1805764935')

            expect(body.twitchTimeStamp).to.equal('6h14m27s')
            expect(body.top8).to.equal(true)
            expect(body.top8Round).to.equal('Quarter Finals')

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("test empty event")
            expect(event.location).to.equal("Los Angeles, CA")
            expect(event.format).to.deep.equal(["Classic Constructed"])
            expect(event.official).to.equal(true)
            expect(event.startDate.slice(0, 10)).to.equal("2024-03-22")
        })
    })

    it("post match to event that has decklists, and check if the decklist attaches to the match, then check that grabbing that match fully joins the decklist data with match.player1deckData", () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                player1name: 'Alan Chavarin',
                player1hero: 'Ser Boltyn, Breaker of Dawn',
                player2name: 'Player 2 name',
                player2hero: 'Betsy, Skin in the Game',
                format: 'Classic Constructed',
                event: 'test empty event',
                twitch: true,
                link: '1805764935',
                twitchTimeStamp: '6h14m27s',
                top8: 'true', 
                top8Round: 'Finals', 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Alan Chavarin')
            expect(body.player1hero).to.equal('Ser Boltyn, Breaker of Dawn')

            //player1deck would automically get attached
            expect(body.player1deck).to.equal('66580006b6fe78a064c07f75')   

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            
            expect(body.format).to.equal('Classic Constructed')
            expect(body.event.name).to.equal('test empty event')
            expect(body.twitch).to.equal(true)
            expect(body.link).to.equal('1805764935')

            expect(body.twitchTimeStamp).to.equal('6h14m27s')
            expect(body.top8).to.equal(true)
            expect(body.top8Round).to.equal('Finals')

            const event = body.event
            //test correct event entered
            expect(event.name).to.equal("test empty event")
            expect(event.location).to.equal("Los Angeles, CA")
            expect(event.format).to.deep.equal(["Classic Constructed"])
            expect(event.official).to.equal(true)
            expect(event.startDate.slice(0, 10)).to.equal("2024-03-22")


            //check that the join works
            cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches/${body._id}`,)
            .then(response => {
                expect(response.status).to.equal(200)
                const body = response.body
                //we are only gonna check if the decklistdata was joined correctly
                expect(body.player1deckData._id).to.equal('66580006b6fe78a064c07f75')
                expect(body.player1deckData.playerName).to.equal('Alan Chavarin')
                expect(body.player1deckData.hero).to.equal('Ser Boltyn, Breaker of Dawn')

            })
        })
    })

    // it('posts match with new decklists and checks if those decklists are also updated for other matches featuring the same player within the same event', () => {
    //     cy.request({
    //         method: 'POST',
    //         url: `${Cypress.env('CYPRESS_BACKEND_API')}matches`,
    //         headers: {
    //             Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: {
    //             player1name: 'Mara Faris',
    //             player1hero: 'Dromai, Ash Artist',
    //             //player1deck: 'https://www.google.com',
    //             player2name: 'Michael Feng',
    //             player2hero: 'Oldhim, Grandfather of Eternity',
    //             //player2deck: 'https://www.youtube.com',
    //             format: 'Classic Constructed',
    //             event: 'Pro Tour Baltimore',
    //             twitch: true,
    //             link: '1807645052',
    //             twitchTimeStamp: '09h03m23s', 
    //             top8: 'true', 
    //             top8Round: 'Finals', 
    //         }
    //     }).then((response) => {
    //         // first check the update works on the match itself
    //         expect(response.status).to.equal(200)
    //         const body = response.body

    //         expect(body.player1name).to.equal('Mara Faris')
    //         expect(body.player1hero).to.equal('Dromai, Ash Artist')
    //         //expect(body.player1deck).to.equal('https://www.google.com')

    //         expect(body.player2name).to.equal('Michael Feng')
    //         expect(body.player2hero).to.equal('Oldhim, Grandfather of Eternity')
    //         //expect(body.player2deck).to.equal('https://www.youtube.com')
            
    //         expect(body.format).to.equal('Classic Constructed')
    //         expect(body.event.name).to.equal('Pro Tour Baltimore')
    //         expect(body.link).to.equal('1807645052')

    //         expect(body.twitchTimeStamp).to.equal('09h03m23s')
    //         expect(body.top8).to.equal(true)
    //         expect(body.top8Round).to.equal('Finals')

    //         const event = body.event
    //         //test correct event entered
    //         expect(event.name).to.equal("Pro Tour Baltimore")
    //     })

    //     //then check all other matches with mara or michael in them
    //     cy.request({
    //         method: 'GET',
    //         url: `${Cypress.env('CYPRESS_BACKEND_API')}matches/byevent/Pro Tour Baltimore`,
    //         headers: {
    //             Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response) => {
    //         // first check the update works on the match itself
    //         expect(response.status).to.equal(200)
    //         const body = response.body

    //         body.map(match => {

    //             //console.log(match.player1name)
    //             if(match.player1name == 'Mara Faris'){
    //                 expect(match.player1deck).to.equal('https://www.google.com')
    //             }

    //             if(match.player2name == 'Mara Faris'){
    //                 expect(match.player2deck).to.equal('https://www.google.com')
    //             }

    //             if(match.player1name == 'Michael Feng'){
    //                 expect(match.player1deck).to.equal('https://www.youtube.com')
    //             }

    //             if(match.player2name == 'Michael Feng'){
    //                 expect(match.player2deck).to.equal('https://www.youtube.com')
    //             }
    //         })
    //     })
    // })
})
