
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


})