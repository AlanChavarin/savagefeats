context("decklist routes tests suite", () => {
    it("getDecklists", () => {
        console.log()
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}decklists`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.decklists)).to.equal(true)
            expect(typeof response.body.count).to.equal('number')

            response.body.decklists.map(decklist => {
                expect(typeof decklist.format).to.equal('string')
            })
        })
    })
})