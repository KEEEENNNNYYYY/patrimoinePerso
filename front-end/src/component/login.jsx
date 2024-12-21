import React, { useState } from 'react';

const Login = () => {
  // Déclaration des états pour l'username et le password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // Pour afficher une erreur éventuelle
  const [loading, setLoading] = useState(false);  // Pour gérer le statut de chargement

  // Fonction qui gère l'envoi du formulaire
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire (rechargement de la page)

    // Validation simple des champs
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true); // Début du chargement

    try {
      
      const response = await fetch('https://patrimoineperso-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Envoyer les données sous forme de JSON
      });

      if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
      }

      const data = await response.json();
      // Traitement de la réponse (par exemple, stocker un token JWT)
      console.log('Login successful:', data);

      // Réinitialisation des champs de formulaire
      setUsername('');
      setPassword('');
      setError(null); // Réinitialiser les erreurs
    } catch (err) {
      setError(err.message); // Afficher l'erreur en cas de problème
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {/* Affichage des erreurs */}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
