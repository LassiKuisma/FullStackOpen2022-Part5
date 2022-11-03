describe('Note app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3001')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Note app, product of insanity')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
        cy.get('#username').type('cypress-man')
        cy.get('#password').type('cypress tests my app')
        cy.get('#login-button').click()

        cy.contains('Cyp Ress logged-in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('cypress-man')
            cy.get('#password').type('cypress tests my app')
            cy.get('#login-button').click()
        })

        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('Save').click()
            cy.contains('a note created by cypress')
        })
    })
})
