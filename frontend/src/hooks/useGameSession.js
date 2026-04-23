import { useEffect, useState } from "react";
import { startGameSession } from "../api/gameApi";

export const useGameSession = (currentGame) => {
    const [gameSessionId, setGameSessionId] = useState(null);
    const [foundCharacters, setFoundCharacters] = useState([]);

    const isGameOver = currentGame?.characters.length > 0 && foundCharacters.length === currentGame.characters.length;
                       
    useEffect(() => {
        if (!currentGame || gameSessionId) {
            return;
        };

        const initGameSession = async () => {
            try {
                const { sessionId } = await startGameSession(currentGame.id);

                setGameSessionId(sessionId);

            } catch (error) { 
                console.log("Game session start error:", error); 
            };
        };

        initGameSession();

    }, [currentGame, gameSessionId]);

    return { 
        gameSessionId, 
        foundCharacters, 
        setFoundCharacters, 
        isGameOver 
    };
};