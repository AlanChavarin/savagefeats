context("example API test suite", () => {
    it("example test (singular)", () => {
        cy.request("http://localhost:5000/api/matches").then(response => {
            expect(response.status).to.eq(200)
        })
    })
})