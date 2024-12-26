import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Login from './component/login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Met à jour l'état de l'utilisateur
    });

    return () => unsubscribe(); // Nettoyage de l'écouteur
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Déconnexion
      window.location.replace('/login'); // Redirection vers la page de connexion
    } catch (err) {
      console.error("Erreur de déconnexion :", err.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} /> 
      </Routes>

      <div>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </Router>
  );
}

export default App;
