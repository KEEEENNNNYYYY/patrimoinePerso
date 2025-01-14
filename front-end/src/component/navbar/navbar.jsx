import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Axios from 'axios';
import './navbar.css';

const Navigationbar = () => {
    const [clicked, isClicked] = useState(false);
    const [display, setDisplay] = useState('none');

    function handleDisplay() {
        if (clicked === true) {
            setDisplay('flex');
        }
        else {
            setDisplay('none');
        }
    }


    // const [user, setUser] = useState(null); // Initialiser à null
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Récupérer les données de l'utilisateur
    //     const fetchUser = async () => {
    //         try {
    //             const response = await Axios.get('https://patrimoineperso-backend.onrender.com/users');
    //             if (response.data && response.data.length > 0) {
    //                 setUser(response.data[0].first_name); // Utiliser first_name
    //             } else {
    //                 setError('Aucun utilisateur trouvé');
    //             }
    //         } catch (err) {
    //             setError('Erreur de récupération de l\'utilisateur');
    //             console.error(err);
    //         }
    //     };

    //     fetchUser(); 
    // }, []); 
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
            <nav>
                {/* {error ? <p>{error}</p> : <p>{user ? `User : ${user}` : 'Chargement...'}</p>} */}
                <h1>
                    MyPatrimoine
                </h1>
                <input type="text" />
                <div className='right-container'>
                    <button className='setting-button'>
                        <img src="../../../public/help-web-button.png" alt="" className='help'/>
                    </button>
                    
                    <button onClick={() => { isClicked(!clicked); handleDisplay(); }} className='setting-button'>
                        <img
                            className='nav-settings'
                            src="../../../public/settings.png" alt="" />

                    </button>
                </div>

                <div className='drop-down-menu-container' style={{ display: display }}>
                    <button>
                        Profil
                    </button>
                    <button>
                        History
                    </button>
                    <button>
                        Contact us
                    </button>
                    <button>
                        Settings
                    </button>
                    <button onClick={handleLogout}>Disconnect</button>

                </div>

            </nav>
        </>

    )
}

export default Navigationbar;