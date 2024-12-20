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
            localStorage.setItem("LOCAL_STORAGE_API_KEY", response.data.token);
            setError('');
            navigate('/');
        })
        .catch(error => {
            console.error("Error: ", error);
            
            if (error.response) {
                // Erreur de réponse du serveur
                setError(error.response.data.message || 'Erreur de connexion');
            } else if (error.request) {
                // Pas de réponse du serveur
                setError('Serveur injoignable. Vérifiez votre connexion.');
            } else {
                // Erreur de configuration
                setError('Une erreur est survenue. Réessayez plus tard.');
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
