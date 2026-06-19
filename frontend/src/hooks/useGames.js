import { useContext } from 'react';
import GamesContext from '../context/GamesContext.js';

export default function useGames() {
    const context = useContext(GamesContext); // returns null if useGames hook is executed outside <GamesContextProvider />

    if (!context) {
        throw new Error('useGames must be used inside a <GamesContextProvider /> component.');
    }
    
    return context;
}