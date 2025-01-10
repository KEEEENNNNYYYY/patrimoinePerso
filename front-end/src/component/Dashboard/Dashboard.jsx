import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null); // Initialiser à null
    const [error, setError] = useState(null);

    useEffect(() => {
        // Récupérer les données de l'utilisateur
        const fetchUser = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/users');
                if (response.data && response.data.length > 0) {
                    setUser(response.data[0].first_name); // Utiliser first_name
                } else {
                    setError('Aucun utilisateur trouvé');
                }
            } catch (err) {
                setError('Erreur de récupération de l\'utilisateur');
                console.error(err);
            }
        };

        fetchUser(); // Appeler la fonction pour récupérer les données
    }, []); // L'effet s'exécute une seule fois au montage du composant

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Déconnexion
            window.location.replace('/login'); // Redirection vers la page de connexion
        } catch (err) {
            console.error("Erreur de déconnexion :", err.message);
        }
    };

    return (
        <>
            <div>
                <button onClick={handleLogout}>Se déconnecter</button>
                {error ? <p>{error}</p> : <p>{user ? `Bonjour, ${user}` : 'Chargement...'}</p>}
            </div>
        </>
    );
};

export default Dashboard;
