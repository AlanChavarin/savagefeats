beforeEach(() => {
    // restores database before each test runs 
    const resetMongoDBCommand = (`mongorestore --drop --uri ${Cypress.env('MONGO_TEST_URI')} ../mongodump`)
    cy.exec(resetMongoDBCommand)
})

context("postContent test suite", () => {
    // it("postContent", () => {
    //     cy.request({
    //         failOnStatusCode: false,
    //         method: 'POST',
    //         url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
    //         headers: {
    //             Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: {
    //             videoid: 'JxS5E-kZc2s',
    //             type: 'decktech',
    //             relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
    //             relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
    //             relatedDecklistid: '65e56186bb2a4338f25fafef'
    //         }
    //     }).then(response => {
    //         expect(response.status).to.equal(200)
    //         const body = response.body
    //         expect(body.videoid).to.equal('JxS5E-kZc2s')
    //         expect(body).to.have.property('publishedAt')
    //         expect(body).to.have.property('parentContentCreatorYoutubeChannelid')
    //         expect(body).to.have.property('parentContentCreatorid')
    //         expect(body).to.have.property('title')
    //         expect(body).to.have.property('description')
    //         expect(body).to.have.property('channelTitle')

    //         expect(body.type).to.equal('decktech')
    //         expect(body.relatedEventid).to.eql(['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'])
    //         expect(body.relatedMatchid).to.eql(['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'])
    //         expect(body.relatedDecklistid).to.equal('65e56186bb2a4338f25fafef')
    //     })
    // })

    it("postContent, no videoid given", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })


    it("postContent, wrong videoid", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'aasds'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContent, no token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'JxS5E-kZc2s',
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContent, wrong token", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer geshghfghhurtyujftyhk`,
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'JxS5E-kZc2s',
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    it("postContent, user without permissions", () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('CYPRESS_BACKEND_API')}content`,
            headers: {
                Authorization: `Bearer ${Cypress.env('CYPRESS_TEST_BEARER_TOKEN_PERMISSIONLESS_USER')}`,
                'Content-Type': 'application/json'
            },
            body: {
                videoid: 'JxS5E-kZc2s',
                type: 'decktech',
                relatedEventid: ['642b74dcad7c9e49cf97e67f', '642c8dce8183f3b83d39818b'],
                relatedMatchid: ['642b7fe5ff5f3ef28bc36cac', '642b8724ff5f3ef28bc36e37'],
                relatedDecklistid: '65e56186bb2a4338f25fafef'
            }
        }).then(response => {
            expect(response.status.toString()[0]).to.equal('4')
        })
    })

    
})
