import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      await loginService.login({ username, password });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <LoginForm onLoginFormSubmit={loginHandler} />
      <ul>
        {blogs.map((blog) => (
          <Blog blog={blog} />
        ))}
      </ul>
    </div>
  );
}

export default App;
