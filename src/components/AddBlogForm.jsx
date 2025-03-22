import React, { useState } from 'react';

const AddBlogForm = ({ onAddBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  return (
    <>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            name='title'
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            type='text'
            name='author'
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>URL:</label>
          <input
            id='url'
            type='text'
            name='url'
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
          />
        </div>
        <button type='submit'>Add Blog</button>
      </form>
    </>
  );
};

export default AddBlogForm;
