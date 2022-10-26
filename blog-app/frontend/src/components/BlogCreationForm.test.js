import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreationForm from './BlogCreationForm'

test('creating new blog submits blog in correct format', async () => {
    const blogSubmit = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogCreationForm createBlog={blogSubmit} />)

    const submitButton = screen.getByText('Create')

    const inputTitle = container.querySelector('#input-blog-title')
    const inputAuthor = container.querySelector('#input-blog-author')
    const inputUrl = container.querySelector('#input-blog-url')

    await user.type(inputTitle, 'this is the title')
    await user.type(inputAuthor, 'I typed in author')
    await user.type(inputUrl, 'blog url goes here')

    await user.click(submitButton)

    expect(blogSubmit.mock.calls).toHaveLength(1)
    expect(blogSubmit.mock.calls[0][0]).toEqual(
        {
            title: 'this is the title',
            author: 'I typed in author',
            url: 'blog url goes here'
        }
    )
})

