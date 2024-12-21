import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000, // 30 secondes
    timeoutErrorMessage: 'Le serveur ne répond pas',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Ajoutez des intercepteurs pour le débogage
instance.interceptors.request.use(
    config => {
        console.log('Requête envoyée:', config.url);
        console.log('Méthode:', config.method);
        console.log('Données:', config.data);
        return config;
    },
    error => {
        console.error('Erreur avant envoi:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        console.error('Erreur de réponse:', error);
        return Promise.reject(error);
    }
);

export default instance; // Vous pouvez exporter l'instance pour l'utiliser dans d'autres parties du code
