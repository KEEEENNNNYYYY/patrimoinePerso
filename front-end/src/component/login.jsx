import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../model/instance";

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userLogin: '',
        userPasssword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleClick = () => {
        const { userLogin, userPasssword } = loginData;
        
        // Validation des champs avant envoi
        if (!userLogin || !userPasssword) {
            setError('Veuillez remplir tous les champs');
            return;
        }
    
        instance.post('/login', {
            email: userLogin,
            password: userPasssword
        })
        .then(response => {
            console.log('Réponse complète du serveur:', response);
            localStorage.setItem("LOCAL_STORAGE_API_KEY", response.data.token);
            setError('');
            navigate('/');
        })
        .catch(error => {
            console.error("Erreur détaillée : ", error);
            
            // Log plus détaillé
            if (error.response) {
                console.log('Données de réponse:', error.response.data);
                console.log('Statut:', error.response.status);
                console.log('Headers:', error.response.headers);
            }
            
            if (error.request) {
                console.log('Requête:', error.request);
            }
            
            // Message d'erreur spécifique
            if (error.message === 'Network Error') {
                setError('Problème de réseau. Vérifiez votre connexion internet.');
            } else if (error.code === 'ECONNABORTED') {
                setError('La requête a dépassé le temps limite.');
            } else {
                setError('Serveur injoignable. Vérifiez votre connexion.');
            }
        });
        
    };
    

    return (
        <>
            <p>Login</p>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
                type="text"
                value={loginData.userLogin}
                name="userLogin" 
                className="userLogin"
                onChange={handleChange}
                placeholder="Enter your email"
            />
            <p>Password</p>
            <input
                type="password" 
                value={loginData.userPasssword}
                name="userPasssword" 
                className="userPassword"
                onChange={handleChange}
                placeholder="Enter your password"
            />
            <button onClick={handleClick}>
                Login
            </button>
        </>
    );
}

export default Login;
