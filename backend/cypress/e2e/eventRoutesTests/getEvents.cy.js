
//no need to reset database since these are all get requests

const checkPropertiesOfEachEvent = (events) => {
    events.map(event => {
        expect(event.name).to.not.be.undefined
        expect(event.format).to.not.be.undefined
        expect(event.startDate).to.not.be.undefined
    })
}

context('events route test suite', () => {
    it('getEvents no queries', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)
        })
    })

    it('getEvents text query \'pro tour\'', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&text=pro tour`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                expect(event.name.toLowerCase().includes('pro tour')).to.be.true
            })
        })
    })

    it('getEvents text query \'Lawndale, CA\'', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&text=Lawndale, CA`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                let passes = false
                for(let key in event){
                    if(typeof event[key] === 'string' && event[key].includes('Lawndale, CA')){
                        passes = true
                    }
                }
                expect(passes).to.be.true
            })
        })
    })

    it('getEvents format query \'Classic Constructed\'', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&format=Classic Constructed`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                let passes = false
                if(typeof event.format === 'string' && event.format === 'Classic Constructed'){
                    passes = true
                } else if (Array.isArray(event.format)){
                    event.format.map(format => {
                        if(format === 'Classic Constructed'){
                            passes = true
                        }
                    })
                }
                expect(passes).to.be.true
            })
        })
    })

    it('getEvents format query \'Blitz\'', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&format=Blitz`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                let passes = false
                if(typeof event.format === 'string' && event.format === 'Blitz'){
                    passes = true
                } else if (Array.isArray(event.format)){
                    event.format.map(format => {
                        if(format === 'Blitz'){
                            passes = true
                        }
                    })
                }
                expect(passes).to.be.true
            })
        })
    })

    it('getEvents format query \'Draft\'', () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&format=Draft`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                let passes = false
                if(typeof event.format === 'string' && event.format === 'Draft'){
                    passes = true
                } else if (Array.isArray(event.format)){
                    event.format.map(format => {
                        if(format === 'Draft'){
                            passes = true
                        }
                    })
                }
                expect(passes).to.be.true
            })
        })
    })

    it("getEvents query official=true", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&official=true`)
        .then(response => {
            expect(response.status).to.eq(200)
            console.log(response.body)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                console.log(event)
                expect(event.official).to.equal(true)
            })
        })
    })

    it("getEvents query official=false", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&official=false`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                expect(event.official).to.equal(false)
            })
        })
    })

    it("getEvents query official=false", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&official=false`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                expect(event.official).to.equal(false)
            })
        })
    })

    it("getEvents query tier=1", () => {
        cy.request(`${Cypress.env('CYPRESS_BACKEND_API')}events?&tier=1`)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(typeof response.body.count).to.equal('number')
            checkPropertiesOfEachEvent(response.body.events)

            response.body.events.map(event => {
                expect(event.tier).to.equal(1)
            })
        })
    })
    
    


})