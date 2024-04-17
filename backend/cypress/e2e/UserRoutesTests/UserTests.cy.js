before(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("User Routes test suite", () => {
    it("generateSignUpLink", () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/generatesignuplink`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            cy.wrap(response.body.link).should('include', 'register')
        })
    })

    it("generateSignUpLink, then register", () => {
        // part 1
        cy.request({
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/generatesignuplink`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.link.includes('register')).to.equal(true)
            return response.body.token
        }).then(token => 
            // part 2

            cy.request({
                method: 'POST',
                url: `${Cypress.env('CYPRESS_BACKEND_API')}users/register`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    name: 'AlanChavarin',
                    password: 'password1234'
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('_id')
                expect(response.body.name).to.equal('AlanChavarin')
            })
        )
    })

    it("verify a user", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/verify/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                verified: true
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body.verified).to.equal(true)
            expect(response.body._id).to.equal('6620433908457326610950c4')
        })
    })

    it("changePrivileges to moderator for a regular user", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'moderator'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('6620433908457326610950c4')
            expect(response.body.privilege).to.equal('moderator')
        })
    })

    it("changePrivileges to admin for a regular user", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620437808457326610950cb`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'admin'
            }
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.equal('6620437808457326610950cb')
            expect(response.body.privilege).to.equal('admin')
        })
    })

    it("getUsers", () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(Array.isArray(response.body.users)).to.equal(true)
            expect(typeof response.body.count).to.equal('number')
            response.body.users.map(user => {
                expect(user).to.have.property('_id')
                expect(user).not.have.property('password')
            })
        })
    })
})


