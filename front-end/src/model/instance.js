import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://patrimoineperso-backend.onrender.com',
    timeout: 10000,
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("LOCAL_STORAGE_API_KEY");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance; // Vous pouvez exporter l'instance pour l'utiliser dans d'autres parties du code
