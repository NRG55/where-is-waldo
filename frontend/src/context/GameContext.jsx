import { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/games`)
        .then(res => res.json())
        .then(data => {
            setGames(data);
            setLoading(false);
        });
    }, []);

    return (
        <GameContext.Provider value={{ games, loading }}>
            {children}
        </GameContext.Provider>
    );
};

const useGames = () => useContext(GameContext);

export default useGames;