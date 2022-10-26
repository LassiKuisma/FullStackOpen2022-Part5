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
