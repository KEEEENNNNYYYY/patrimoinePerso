import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import './mobileLogin.css';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // Remplace history.push par navigate
            console.log("Utilisateur connecté :", userCredential.user);
        } catch (err) {
            let errorMessage = "Échec de la connexion. Veuillez réessayer.";
            if (err.code === "auth/invalid-email") {
                errorMessage = "L'email est incorrect.";
            } else if (err.code === "auth/user-disabled") {
                errorMessage = "Ce compte a été désactivé.";
            } else if (err.code === "auth/user-not-found") {
                errorMessage = "Utilisateur non trouvé.";
            } else if (err.code === "auth/wrong-password") {
                errorMessage = "Mot de passe incorrect.";
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <p htmlFor="email">Email</p>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <p htmlFor="password">Password</p>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <h1>
                MyPatrimoine
            </h1>
        </div>
    );
};

export default Login;
