import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    test('by default displays title and author but not url or likes', () => {
        const blog = {
            title: 'blog title',
            author: 'blog author',
            url: 'blog url',
            likes: 'blog likes',
        }

        const { container } = render(<Blog blog={blog} />)
        const summary = container.querySelector('.blogSummary')
        const expanded = container.querySelector('.blogExpanded')

        expect(summary).not.toHaveStyle('display: none')
        expect(expanded).toHaveStyle('display: none')
    })
})
