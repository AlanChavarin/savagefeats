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
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Player 1 name')
            expect(body.player1hero).to.equal('Victor Goldmane, High and Mighty')
            expect(body.player1deck).to.equal('https://www.google.com')

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            expect(body.player2deck).to.equal('https://www.youtube.com')

            
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
        }).then((response) => {
            expect(response.status).to.equal(200)
            const body = response.body

            expect(body.player1name).to.equal('Player 1 name')
            expect(body.player1hero).to.equal('Victor Goldmane, High and Mighty')
            expect(body.player1deck).to.equal('')

            expect(body.player2name).to.equal('Player 2 name')
            expect(body.player2hero).to.equal('Betsy, Skin in the Game')
            expect(body.player2deck).to.equal('')

            
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
                    player1deck: 'https://www.google.com',
                    player2name: names[13-i],
                    player2hero: heroes[13-i],
                    player2deck: 'https://www.youtube.com',
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
                expect(body.player1deck).to.equal('https://www.google.com')

                expect(body.player2name).to.equal(names[13-i])
                expect(body.player2hero).to.equal(heroes[13-i])
                expect(body.player2deck).to.equal('https://www.youtube.com')

                
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
                    player1deck: 'https://www.google.com',
                    player2name: names[13-i],
                    player2hero: heroes[13-i],
                    player2deck: 'https://www.youtube.com',
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
                expect(body.player1deck).to.equal('https://www.google.com')

                expect(body.player2name).to.equal(names[13-i])
                expect(body.player2hero).to.equal(heroes[13-i])
                expect(body.player2deck).to.equal('https://www.youtube.com')

                
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
})
