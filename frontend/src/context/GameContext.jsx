import { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/games')
        .then(res => res.json())
        .then(data => {console.log(data)
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