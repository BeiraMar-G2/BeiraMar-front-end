import axios from "axios";

const IP_API = import.meta.env.VITE_API_URL || 'localhost';
const BASE_URL = `/api`;

console.log('Configuração da API:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    IP_API,
    BASE_URL
});

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    }
});

api.interceptors.response.use(
    (resp) => resp,
    (error) => {
        if (error?.response?.status === 404 || error?.response?.status === 400) {
            console.warn("API request failed:", error.response.status, error.config?.url);
        }
        return Promise.reject(error);
    }
);


export default api;