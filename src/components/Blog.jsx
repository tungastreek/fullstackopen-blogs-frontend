const Blog = ({ blog }) => {
  return <li key={blog.id}>{blog.title}</li>;
};

export default Blog;
