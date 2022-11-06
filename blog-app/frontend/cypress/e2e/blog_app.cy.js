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

            it('User can like blogs', function () {
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

            it('Blogs are ordered by number of likes', function () {
                // expand all
                cy.get('.blogSummary')
                    .each(summary => {
                        cy.wrap(summary).contains('View').click()
                    })

                // throw some likes on blogs
                cy.get('.blogExpanded').contains('Title #3').contains('Like').click()
                cy.get('.blogExpanded').contains('Title #3').should('contain', 'likes 1')

                for (let i = 0; i < 8; i++) {
                    cy.get('.blogExpanded').contains('Title #1').contains('Like').click()
                    cy.get('.blogExpanded').contains('Title #1').should('contain', `likes ${i + 1}`)
                }

                // expected amount of likes: blog#1=8, blog#2=0, blog#3=1
                cy.get('.blogExpanded').eq(0)
                    .should('contain', 'Title #1')
                    .should('contain', 'likes 8')
                cy.get('.blogExpanded').eq(1)
                    .should('contain', 'Title #3')
                    .should('contain', 'likes 1')
                cy.get('.blogExpanded').eq(2)
                    .should('contain', 'Title #2')
                    .should('contain', 'likes 0')
            })
        })
    })

    describe('Deleting blogs', function () {
        beforeEach(function () {
            const other_user = {
                name: 'Sserpyc',
                username: 'otherguy',
                password: 'you shall pass'
            }
            cy.request('POST', 'http://localhost:3003/api/users', other_user)

            cy.login({ username: 'otherguy', password: 'you shall pass' })
            cy.contains('Logged in as Sserpyc')

            // blogs #1 and #2 posted by 'otherguy'
            cy.createBlog({ title: 'Title #1', author: 'Author #1', url: 'Url #1' })
            cy.createBlog({ title: 'Title #2', author: 'Author #2', url: 'Url #2' })

            // logout, log back in with original user
            cy.contains('Log out').click()
            cy.login({ username: 'cypuser', password: 'secret password' })
            cy.contains('Logged in as Cypress User')

            cy.createBlog({ title: 'Title #3', author: 'Author #3', url: 'Url #3' })
            cy.createBlog({ title: 'Title #4', author: 'Author #4', url: 'Url #4' })
        })

        it('Can be done by user who posted it', function () {
            cy.get('.blogSummary')
                .contains('Title #4')
                .contains('View')
                .click()

            cy.get('.blogExpanded')
                .contains('Title #4')
                .contains('Remove').click()

            cy.get('html').should('not.contain', 'Title #4')
        })

        it('Cannot be done by users that did not originally post it', function () {
            cy.get('.blogSummary')
                .contains('Title #1')
                .contains('View')
                .click()

            cy.get('.blogExpanded')
                .contains('Title #1')
                .should('not.contain', 'Remove')
        })
    })
})
