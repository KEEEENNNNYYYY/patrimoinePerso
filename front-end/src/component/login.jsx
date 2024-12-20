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
    
        instance.post('/login', {
            email: userLogin,
            password: userPasssword
        })
        .then(function (response) {
            console.log("Response: ", response);
            
            // Stocker le token
            localStorage.setItem("LOCAL_STORAGE_API_KEY", response.data.token);
            
            // Réinitialiser les erreurs
            setError('');
            
            // Rediriger vers la page d'accueil
            navigate('/');
        })
        .catch(function (error) {
            console.error("Error: ", error);
            
            // Gérer les erreurs de connexion
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code d'état
                // qui sort de la plage de 2xx
                setError(error.response.data.message || 'Erreur de connexion');
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                setError('Pas de réponse du serveur');
            } else {
                // Quelque chose s'est passé lors de la configuration de la requête
                setError('Erreur lors de la connexion');
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
