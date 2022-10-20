import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.error('Failed to log in!')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    console.log('logging out')

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    console.log('Adding new blog...')

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    const created = await blogService.create(blogObject)
    console.log('new blog created!')

    setBlogs(blogs.concat(created))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  // displays user name, and log-out button
  const userForm = () => {
    if (user === null) {
      return (<></>)
    }

    return (
      <div>
        <p>Logged in as {user.name}
          <button onClick={handleLogout}>Log out</button>
        </p>
      </div>
    )
  }

  const newBlogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <ul>
          <li>Title:
            <input
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </li>
          <li>Author:
            <input
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </li>
          <li>Url:
            <input
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </li>
        </ul>
        <button type="submit">Create</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      {user !== null && userForm()}
      {newBlogForm()}
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
