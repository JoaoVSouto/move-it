import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://move-it-joaovsouto.vercel.app',
});

export default api;
