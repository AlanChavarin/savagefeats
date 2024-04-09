before(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("getReports tests suite", () => {
    it("getReport", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}reports/6614afeda6a051f3e656e6ed`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal("6614afeda6a051f3e656e6ed")
        })
    })

    it("getReports", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}reports`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.reports)).to.equal(true)

            response.body.reports.map(report => {
                expect(report).to.have.property('_id')
                expect(report).to.have.property('subject')
                expect(report).to.have.property('body')
                expect(report).to.have.property('status')
            })
        })
    })
})