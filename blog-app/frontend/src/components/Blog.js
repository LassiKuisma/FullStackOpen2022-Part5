import { useState } from 'react'

const Blog = ({ blog }) => {
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

  // TODO: add "like" button
  const BlogExpanded = (props) => (
    <div>{blog.title} {blog.author} {props.children}<br />
      {blog.url}<br />
      likes {blog.likes} ADD LIKE BUTTON HERE!!<br />
      {blog.user.name}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <BlogSummary>
          <button onClick={toggleVisibility}>View</button>
        </BlogSummary>
      </div>
      <div style={showWhenVisible}>
        <BlogExpanded>
          <button onClick={toggleVisibility}>Hide</button>
        </BlogExpanded>
      </div>
    </div>
  )
}

export default Blog