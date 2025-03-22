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

export default { setAuthHeader, getAll, create };
