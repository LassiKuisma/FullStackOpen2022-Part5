describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Cypress User',
            username: 'cypuser',
            password: 'secret password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('cypuser')
            cy.get('#password').type('secret password')
            cy.get('#login-button').click()

            cy.contains('Logged in as Cypress User')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('cypuser')
            cy.get('#password').type('wrong password')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Logged in as Cypress User')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'cypuser', password: 'secret password' })
        })

        it('A blog can be created', function () {
            cy.contains('New blog').click()
            cy.get('#input-blog-title').type('A new blog created by cypress')
            cy.get('#input-blog-author').type('The author of the blog goes here')
            cy.get('#input-blog-url').type('URL go bbrrrr')

            cy.get('#create-blog').click()

            cy.contains('A new blog created by cypress')
        })
    })
})
