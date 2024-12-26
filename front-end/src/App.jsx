import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correction des importations
import Login from './component/login'; // Assurez-vous que le chemin vers Login est correct
import './App.css';
import { useEffect } from 'react';
import { auth } from './firebase';


function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Si un utilisateur est déjà authentifié, rediriger vers la page d'accueil '/'
        if (window.location.pathname === '/login') {
          window.location.replace('/dashboard'); // Redirection vers la page d'accueil
        }
      }
    });


    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Déconnexion de l'utilisateur
      history.push('/login'); // Redirige vers la page de connexion après déconnexion
    } catch (err) {
      console.error("Erreur de déconnexion :", err.message);
    }
  };
  return (
    <Router> {/* Enveloppez votre application avec Router */}
      <Routes> {/* Définissez les routes de votre application */}
        <Route path="/login" element={<Login />} /> {/* Définissez la route /login pour afficher la page Login */}
      </Routes>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/assets/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>

      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </Router>
  );
}

export default App;
