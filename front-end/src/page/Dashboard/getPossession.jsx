import axios from 'axios';
import React, { useState, useEffect } from 'react';

const GetPossession = () => {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/possessions');
                setPossessions(response.data); // Mise à jour de l'état avec la réponse des possessions
            } catch (error) {
                console.error("Erreur lors de la récupération des données", error);
            }
        };
        fetchData();
    }, []); // Le tableau de dépendances est vide pour ne récupérer les données qu'une seule fois

    return (
        <ul>
            {/* {possessions.map((possession) => (
                <li key={possession.id}>
                    nom : {possession.name}
                    date d'obtention : {new Date(possession.obtention_day).toLocaleDateString()}
                    valeur : {possession.value}
                </li>
            ))} */}
        </ul>
    );
};

export default GetPossession;
