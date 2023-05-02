import api from './api';

const login = async (name, password) => {
  const { data } = await api.post('/login', { name, password });

  const { token, user } = data;

  localStorage.setItem('token', token);
  localStorage.setItem('userId', JSON.stringify(user.id));

  api.defaults.headers['x-access-token'] = token;

  const response = {
    auth: data.auth,
    user: data.user,
  };
  return response;
};

const renew = () => api.head('/renew');

export default {
  login,
  renew,
};
