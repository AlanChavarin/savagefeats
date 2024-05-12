before(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("user error test suite", () => {
    it("generateSignUpLink without headers", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/generatesignuplink`,
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("generateSignUpLink with nonsense token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/generatesignuplink`,
            headers: {
                Authorization: `Bearer ertrthydtjfghjfhjhgjkhjklhjkll;`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("generateSignUpLink without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/generatesignuplink`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("verify a user no header", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/verify/6620433908457326610950c4`,
            body: {
                verified: true
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("verify a user garbage header", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/verify/6620433908457326610950c4`,
            headers: {
                Authorization: 'wegojhsdfgijodfgh',
                'Content-Type': 'application/json'
            },
            body: {
                verified: true
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("verify a user, no permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/verify/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                verified: true
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to moderator for a regular user, no header", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            body: {
                privilege: 'moderator'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to moderator for a regular user, non sense header", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer wrfgsdrghdrtyujfgh`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'moderator'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to moderator for a regular user, no permissions", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'moderator'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to admin for a regular user, no header", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            body: {
                privilege: 'admin'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to admin for a regular user, non sense header", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer wrfgsdrghdrtyujfgh`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'admin'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("changePrivileges to admin for a regular user, no permissions", () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/changeprivileges/6620433908457326610950c4`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                privilege: 'admin'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("getUsers, no header", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users`,
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("getUsers, garbage header", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users`,
            headers: {
                Authorization: `Bearer ergjiodhjokdrthlfghj`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("loginUser, non-existent user", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/login`,
            body: {
                name: 'serhjkoljnjxfdghkolnmldfgkjdfgthkj',
                password: 'password12345'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("loginUser, wrong password", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/login`,
            body: {
                name: 'test_user_12345',
                password: 'password12345ewsrtgioyhdflrtyhj'
            }
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("loginUser, no body", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/login`
        }).then(response => {
            expect(response.status).to.equal(400)
        })
    })

    it("loginUser, unverified user", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}users/login`,
            body: {
                name: 'test_user_1234',
                password: 'password1234'
            }
        }).then(response => {
            expect(response.body).to.have.property('errorMessage')
            expect(response.body.errorMessage.includes('not verified')).to.equal(true)
            expect(response.status).to.equal(400)
        })
    })

})
