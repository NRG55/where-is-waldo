import { useState, useEffect } from "react";

export const useGameLogic = (gameMapRef) => {
    const [coordinates, setCoordinates] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ 
        isOnTheLeft: false, 
        isBottomAligned: false,
        isTopAligned: false
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gameMapRef.current && !gameMapRef.current.contains(event.target)) {
                setCoordinates(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [gameMapRef]);

    const handleGameMapClick = (event) => {
        const gameMap = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - gameMap.left;
        const y = event.clientY - gameMap.top;

        setMenuPosition({
            isOnTheLeft: x + 250 > gameMap.width,
            isTopAligned: y < 100,
            isBottomAligned: y + 200 > gameMap.height            
        });
        
        setCoordinates({ x, y, width: gameMap.width, height: gameMap.height });
    };

    return { coordinates, setCoordinates, menuPosition, handleGameMapClick };
};