import Togglable from './utils/Togglable';

const Blog = ({ blog, likeBlogHandler, deleteBlogHandler, currentUser }) => {
  return (
    <div className='blog-entry'>
      <h3>{blog.title}</h3>
      <p className='blog-author'>by {blog.author}</p>
      <Togglable
        buttonLabel='View Details'
        cancelButtonLabel='Hide Details'
        buttonClassName='toggle-button'
      >
        <div className='blog-details'>
          <a href={blog.url} target='_blank' rel='noopener noreferrer' className='blog-url'>
            {blog.url}
          </a>
          <p className='blog-user'>Added by: {blog.user.name}</p>
          <button className='blog-like' onClick={() => likeBlogHandler(blog)}>
            Likes: {blog.likes}
          </button>
          {currentUser && currentUser.id === blog.user.id && (
            <button className='blog-delete' onClick={() => deleteBlogHandler(blog)}>
              Delete
            </button>
          )}
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
