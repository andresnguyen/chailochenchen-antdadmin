import axiosClient from './axiosClient';

const productAPI = {
  getAll(params) {
    const url = '/products';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data, id) {
    const url = `/products/${id}`;
    return axiosClient.patch(url, data);
  },

  delete(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productAPI;
