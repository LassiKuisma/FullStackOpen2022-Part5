import { useState } from 'react'

const BlogCreationForm = ({ createBlog }) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const handleBlogTitleChange = (event) => {
        setBlogTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setBlogAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setBlogUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,

        })

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }


    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <ul>
                    <li>Title:
                        <input
                            value={blogTitle}
                            onChange={handleBlogTitleChange}
                        />
                    </li>
                    <li>Author:
                        <input
                            value={blogAuthor}
                            onChange={handleBlogAuthorChange}
                        />
                    </li>
                    <li>Url:
                        <input
                            value={blogUrl}
                            onChange={handleBlogUrlChange}
                        />
                    </li>
                </ul>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogCreationForm
