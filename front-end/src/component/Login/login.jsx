import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Remplace useHistory par useNavigate
import { auth } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Nouvelle instance de useNavigate

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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
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
        </div>
    );
};

export default Login;
