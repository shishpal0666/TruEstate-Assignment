import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/api/auth/login', { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post('/api/auth/register', userData);
  return res.data;
};

export const logout = async () => {
  await api.post('/api/auth/logout');
};

export const me = async () => {
  const res = await api.get('/api/auth/me');
  return res.data;
};
