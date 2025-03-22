import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import UserProfile from './components/UserProfile';
import AddBlogForm from './components/AddBlogForm';
import Togglable from './components/utils/Togglable';

function App() {
  /*
   * Constants
   */
  const loggedInUserKey = 'loggedInUser';

  /*
   * States
   */
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  /*
   * References
   */
  const blogFormRef = useRef();

  /*
   * Effects
   */
  const fetchLoggedInUser = () => {
    const loggedInUser = window.localStorage.getItem(loggedInUserKey);
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setAuthHeader(user.token);
    }
  };

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  /*
   * Helper Functions
   */
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  /*
   * Event Handlers
   */
  const loginHandler = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(loggedInUserKey, JSON.stringify(user));
      blogService.setAuthHeader(user.token);
      showMessage('Logged in successfully', 'success');
    } catch (error) {
      showMessage(`Logged in unsuccessfully: ${error.response.data.error}`, 'error');
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem(loggedInUserKey);
    setUser(null);
    blogService.setAuthHeader(null);
    showMessage('Logged out successfully', 'success');
  };

  const likeBlogHandler = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog.id);
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
      showMessage(`You liked ${updatedBlog.title} by ${updatedBlog.author}`, 'success');
    } catch (error) {
      showMessage(`Failed to like blog: ${error.response.data.error}`, 'error');
    }
  };

  const addBlogHandler = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      showMessage(`Blog ${createdBlog.title} by ${createdBlog.author} added`, 'success');
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      showMessage(`Failed to add blog: ${error.response.data.error}`, 'error');
    }
  };

  const deleteBlogHandler = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        showMessage(`Blog ${blog.title} by ${blog.author} deleted`, 'success');
      } catch (error) {
        showMessage(`Failed to delete blog: ${error.response.data.error}`, 'error');
      }
    }
  };

  /*
   * Render the component
   */
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <>
      <h1>Blogs Application</h1>
      {message && <div className={`notification ${message.type}`}>{message.text}</div>}
      {!user && <LoginForm onLoginFormSubmit={loginHandler} />}
      {user && (
        <>
          <UserProfile user={user} logoutHandler={logoutHandler} />
          <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
            <AddBlogForm onAddBlog={addBlogHandler} />
          </Togglable>
          <h2>List of blogs</h2>
          <div className='blogs-container'>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlogHandler={likeBlogHandler}
                deleteBlogHandler={deleteBlogHandler}
                currentUser={user}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
