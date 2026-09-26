import axios from 'axios';

// Keep the API location configurable.  The previous hard-coded Render URL is
// unavailable, so every sign-in/sign-up request was sent to a dead server
// instead of the backend configured for this project.
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000')
  .replace(/\/$/, '');

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
