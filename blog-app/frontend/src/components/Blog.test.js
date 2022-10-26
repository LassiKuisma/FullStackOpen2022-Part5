import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

    beforeEach(() => {
        const blog = {
            title: 'blog title',
            author: 'blog author',
            url: 'blog url',
            likes: 'blog likes',
        }
        container = render(
            <Blog blog={blog} />
        ).container
    })

    test('by default displays title and author but not url or likes', () => {
        const summary = container.querySelector('.blogSummary')
        const expanded = container.querySelector('.blogExpanded')

        expect(summary).not.toHaveStyle('display: none')
        expect(expanded).toHaveStyle('display: none')
    })

    test('after expanding blog view, url and likes are shown', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)


        const summary = container.querySelector('.blogSummary')
        expect(summary).toHaveStyle('display: none')

        const expanded = container.querySelector('.blogExpanded')
        expect(expanded).not.toHaveStyle('display: none')
    })
})

test('pressing like button twice sends two events', async () => {
    const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'blog url',
        likes: 'blog likes',
    }

    const updateBlog = jest.fn()

    render(
        <Blog
            blog={blog}
            updateBlog={updateBlog}
        />
    )


    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
})
