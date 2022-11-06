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

        describe('There are some blogs', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'Title #1', author: 'Author #1', url: 'Url #1' })
                cy.createBlog({ title: 'Title #2', author: 'Author #2', url: 'Url #2' })
                cy.createBlog({ title: 'Title #3', author: 'Author #3', url: 'Url #3' })
            })

            it.only('User can like blogs', function () {
                cy.get('.blogSummary')
                    .contains('Title #3')
                    .contains('View')
                    .click()

                cy.get('.blogExpanded')
                    .contains('Title #3')
                    .as('theBlog')

                cy.get('@theBlog').contains('Like').click()

                cy.wait(500)

                cy.contains('Liked blog Title #3')
                cy.get('@theBlog').contains('likes 1')
            })
        })
    })
})
