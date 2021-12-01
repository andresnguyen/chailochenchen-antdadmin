import axiosClient from './axiosClient';

const userAPI = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
};

export default userAPI;
