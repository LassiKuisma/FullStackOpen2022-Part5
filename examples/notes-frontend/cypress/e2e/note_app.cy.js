describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Cypress User',
            username: 'cypuser',
            password: 'secret password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Note app, product of insanity')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
        cy.get('#username').type('cypuser')
        cy.get('#password').type('secret password')
        cy.get('#login-button').click()

        cy.contains('Cypress User logged-in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'cypuser', password: 'secret password' })
        })

        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('Save').click()
            cy.contains('a note created by cypress')
        })

        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })

            it('one of those can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton')

                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })
        })
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('cypuser')
        cy.get('#password').type('wrong password')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Cypress User logged-in')
    })
})
