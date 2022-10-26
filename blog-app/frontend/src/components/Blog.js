import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const BlogSummary = (props) => (
        <div>{blog.title} {blog.author} {props.children}</div>
    )

    const likeBlog = (event) => {
        event.preventDefault()

        updateBlog(blog.id, {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
        })
    }

    const removeBlog = (event) => {
        event.preventDefault()

        const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
        if (confirm) {
            deleteBlog(blog.id)
        }
    }

    const BlogExpanded = (props) => {
        const userCanRemove = blog.user !== undefined
            && (user.username === blog.user.username)

        const removeButton = userCanRemove
            ? <><br /><button onClick={removeBlog}>Remove</button></>
            : <></>

        return (
            <div>{blog.title} {blog.author} {props.children}<br />
                {blog.url}<br />
                likes {blog.likes} <button onClick={likeBlog}>Like</button><br />
                {blog.user !== undefined && blog.user.name}
                {userCanRemove && removeButton}
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className='blogSummary'>
                <BlogSummary>
                    <button onClick={toggleVisibility}>View</button>
                </BlogSummary>
            </div>
            <div style={showWhenVisible} className='blogExpanded'>
                <BlogExpanded>
                    <button onClick={toggleVisibility}>Hide</button>
                </BlogExpanded>
            </div>
        </div>
    )
}

export default Blog