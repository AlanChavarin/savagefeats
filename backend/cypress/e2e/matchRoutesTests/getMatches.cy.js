const {
    universalMatchResponsePropertyChecker
} = require('./testHelpers/matchTestHelpers')

// beforeEach(() => {
//     // restores database before each test runs 
//     const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
//     cy.exec(resetMongoDBCommand)
// })

context("matches GET routes test suite", () => {

    it("example test (singular)", () => {
        //console.log(Cypress.env('CYPRESS_BACKEND_API'))
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches`).then(response => {
            expect(response.status).to.eq(200)
        })
    })

    it("getMatches no queries given", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches`)
        .then(response => {
            expect(response.status).to.eq(200)
            universalMatchResponsePropertyChecker(response)
        })
    })

    it("getMatches, hero query", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches?&hero1=Ser Boltyn, Breaker of Dawn`)
        .then(response => {
            expect(response.status).to.eq(200)
            universalMatchResponsePropertyChecker(response)
            response.body.matches.forEach(match => {
                if(match.player1hero === 'Ser Boltyn, Breaker of Dawn' || match.player2hero === 'Ser Boltyn, Breaker of Dawn'){
                    expect(true)
                } else {
                    expect(false)
                }
            })
        })
    })

    it("getMatches, nothing returned", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches?&text=er9t87wer908ghdfjkhndftgjkhndfjkgnhdf`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.matches.length).to.eq(0)
        })
    })

    it("getMatch", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}matches/642b7fe5ff5f3ef28bc36cac`)
        .then(response => {
            expect(response.status).to.eq(200)
            const body = response.body
            expect(body._id).to.eq('642b7fe5ff5f3ef28bc36cac')
        })
    })

})






