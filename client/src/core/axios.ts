import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (config.headers && token) {
        config.headers = { Authorization: `Bearer ${token}` };
    }

    return config;
});

export default instance;
