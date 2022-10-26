import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parents state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    // alt ways
    // const input = screen.getByPlaceholderText('write note content here')

    // requires the field to have id='note-input'
    // const { container } = render(<NoteForm createNote={createNote} />)
    // const input2 = container.querySelector('#note-input')

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('Save')

    await user.type(input, 'testing a form')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form')
})
