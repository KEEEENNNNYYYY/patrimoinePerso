import React from 'react';
import { auth } from '../../firebase';
import { replace } from 'react-router-dom';
import { signOut } from 'firebase/auth';


const Dashboard = () => {
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
            </div>
        </>
    );
};

export default Dashboard;
