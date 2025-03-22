const Blog = ({ blog }) => {
  return (
    <li key={blog.id}>
      {blog.title} by {blog.author}
    </li>
  );
};

export default Blog;
