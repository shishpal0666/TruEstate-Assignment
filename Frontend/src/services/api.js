import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, 
  headers: { 'Content-Type': 'application/json' }
});

export default api;
