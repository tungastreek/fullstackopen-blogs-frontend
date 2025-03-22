import axios from 'axios';
const baseUrl = '/api/blogs';

let configs = {
  headers: {
    Authorization: null,
    ContentType: 'application/json',
  },
};

const setAuthHeader = (token) => {
  configs.headers.Authorization = token ? `Bearer ${token}` : null;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, configs);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, configs);
  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, configs);
  return response.data;
};

const like = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/like`, {}, configs);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, configs);
  return response.data;
};

export default { setAuthHeader, getAll, create, update, like, remove };
