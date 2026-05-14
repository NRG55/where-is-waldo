import { useEffect, useState } from "react";
import { startGameSession, finishGameSession } from "../api/gameApi";

export const useGameSession = (currentGame) => {
    const [gameSessionId, setGameSessionId] = useState(null);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [finalTime, setFinalTime] = useState(null);
    const [isFinalizingSession, setIsFinalizingSession] = useState(false);

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

    useEffect(() => {
        if (!isGameOver || !gameSessionId || finalTime) return;

        const finishSession = async () => {
            setIsFinalizingSession(true);

            try {
                const response = await finishGameSession(gameSessionId);

                setFinalTime(response.time);

            } catch (error) {
                console.log("Game session completion error:", error);

            } finally {
                setIsFinalizingSession(false);
            };
        };

        finishSession();
    }, [isGameOver, gameSessionId, finalTime]);

    return { 
        gameSessionId, 
        foundCharacters, 
        setFoundCharacters, 
        isGameOver,
        isFinalizingSession,
        finalTime 
    };
};