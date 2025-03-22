import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import UserProfile from './components/UserProfile';
import AddBlogForm from './components/AddBlogForm';

function App() {
  /*
   * Constants
   */
  const loggedInUserKey = 'loggedInUser';

  /*
   * States
   */
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [message, setMessage] = useState(null);

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
  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(loggedInUserKey, JSON.stringify(user));
      blogService.setAuthHeader(user.token);
      showMessage('Logged in successfully', 'success');
    } catch (error) {
      showMessage(`Logged in unsuccessfully: ${error.response.data.error}`, 'error');
    }
    setUsername('');
    setPassword('');
  };

  const logoutHandler = () => {
    window.localStorage.removeItem(loggedInUserKey);
    setUser(null);
    blogService.setAuthHeader(null);
    showMessage('Logged out successfully', 'success');
  };

  const addBlogHandler = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      };
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      showMessage(`Blog ${createdBlog.title} by ${createdBlog.author} added`, 'success');
    } catch (error) {
      showMessage(`Failed to add blog: ${error.response.data.error}`, 'error');
    }
    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  /*
   * Render the component
   */
  return (
    <>
      <h1>Blogs Application</h1>
      {message && <div className={`notification ${message.type}`}>{message.text}</div>}
      {!user && (
        <LoginForm
          onLoginFormSubmit={loginHandler}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <UserProfile user={user} logoutHandler={logoutHandler} />
          <h2>List of blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
          <AddBlogForm
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            setBlogAuthor={setBlogAuthor}
            setBlogTitle={setBlogTitle}
            setBlogUrl={setBlogUrl}
            addBlogHandler={addBlogHandler}
          />
        </>
      )}
    </>
  );
}

export default App;
