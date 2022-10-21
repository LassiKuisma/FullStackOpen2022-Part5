import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import UserForm from './components/UserForm'
import Togglable from './components/Togglable'
import BlogCreationForm from './components/BlogCreationForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

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

  const showNotification = (message, type) => {
    setNotification({
      "type": type,
      "message": message
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      showNotification('Wrong username or password', 'red')
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

  const addBlog = async (blogObject) => {
    blogCreationFormRef.current.toggleVisibility()
    const created = await blogService.create(blogObject)
    setBlogs(blogs.concat(created))
    showNotification(`Added new blog ${created.title} by ${created.author}`, 'green')
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
  const userForm = () => (
    <UserForm
      user={user}
      handleLogout={handleLogout}
    />
  )

  const blogCreationFormRef = useRef()

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      {user !== null && userForm()}
      <Togglable buttonLabel='New blog' ref={blogCreationFormRef}>
        <BlogCreationForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App
