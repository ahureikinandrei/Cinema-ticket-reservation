import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';
import LocalStorageService from '../services/localStorage.service';

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
    const token = LocalStorageService.getTokenFromLocalStorage();

    if (config.headers && token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

export default instance;
