import api from './api';

const get = () => api.get('/users');

const getById = (userId) => api.get(`/users/${userId}`);

const remove = (userId) => api.delete(`/users/${userId}`);

const create = (body) => api.post('/users', body);

const update = (body) => api.put(`/users/${body.id}`, body);

export default {
  getById,
  get,
  remove,
  create,
  update,
};
