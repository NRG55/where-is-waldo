import { useState, useEffect } from 'react';
import GamesContext from './GamesContext.js';

export default function GamesContextProvider({ children }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/games`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch levels')
            };

            return res.json();
        })
        .then((data) => {
            setGames(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Games load error:', error);
            setLoading(false);
        });

    }, [SERVER_DOMAIN]);

    return (
        <GamesContext.Provider value={{ games, loading }}>
            {children}
        </GamesContext.Provider>
    );
};