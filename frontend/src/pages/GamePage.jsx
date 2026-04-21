import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import useGames from '../context/GameContext';
import GameTimer from '../components/GameTimer';
import NotFoundPage from './NotFoundPage';
import { startGameSession, submitScore, validateLocation } from '../api/gameApi';
import { useGameLogic } from '../hooks/useGameLogic';
import SelectionMenu from '../components/SelectionMenu';

function GamePage() {
    const { gameSlug } = useParams();
    const { games, loading } = useGames();

    const [gameSessionId, setGameSessionId] = useState(null);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);

    const gameMapRef = useRef(null);

    const { coordinates, setCoordinates, menuPosition, handleGameMapClick } = useGameLogic(gameMapRef);    

    const currentGame = games.find(game => game.slug === gameSlug);

    // init game
    useEffect(() => {
        if (!currentGame || gameSessionId) return;

        const initGame = async () => {
            try {
                const data = await startGameSession(currentGame.id);

                setGameSessionId(data.sessionId);

            } catch (error) {                
                console.log(error);
            };
        };

        initGame();
    }, [currentGame]);

    // check if game is over
    useEffect(() => {
        if (currentGame && foundCharacters.length === currentGame.characters.length && !isGameOver) {
                setIsGameOver(true);
                handleFinishGame();
            };

    }, [foundCharacters, currentGame]);

    const handleFinishGame = async () => {
        const username = "John";

        try {            
            await submitScore(gameSessionId, username);

            console.log("Game is finished, score is saved.");
            
        } catch (error) {
            console.log("Failed to finish the game, score is not saved", error);
        };
    };

    if (!currentGame) {
        return <NotFoundPage />;
    };

    if (loading) {
        return <div>Loading Game...</div>;
    };

    const handleValidate = async (characterName) => {
        const isAlreadyFound = foundCharacters.some(char => char.name === characterName);

        if (isAlreadyFound) {
            setCoordinates(null);
            return; 
        };

        // Coordinates to percentages (for different screen sizes)
        const xPercent = (coordinates.x / coordinates.width) * 100;
        const yPercent = (coordinates.y / coordinates.height) * 100;

        try {
            const result = await validateLocation(currentGame.id, characterName, xPercent, yPercent);
            
            if (result.found) {                
                console.log(result.message);
                setFoundCharacters(prev => [
                    ...prev, 
                    { name: characterName, x: xPercent, y: yPercent }
                ]);
                 
            } else {
                console.log(result.message);
            };

        } catch (error) {
            console.error("Validation failed", error);

        } finally {
            setCoordinates(null);
        };
    };

    return (
        <div>
            <h1 className="text-xl text-center mb-4">
                { currentGame.title }
            </h1>
            
            <GameTimer />

            <div ref={gameMapRef} className="relative w-full rounded-xs border border-gray-300">
                <img 
                    src="/images/game-1.png" 
                    className="cursor-crosshair w-full block"
                    onClick={handleGameMapClick}
                />

                {
                    foundCharacters.map((character) =>
                        <div 
                            key={character.name}
                            className="absolute w-15 h-15 border border-green-500 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                            style={{ left: `${character.x}%`, top: `${character.y}%` }}
                        >
                            <span className="absolute -top-8 bg-green-500 text-white text-sm px-1 rounded-xs">
                                {character.name}
                            </span>
                        </div>
                    )
                }
                
                {
                    coordinates 
                    &&
                    <SelectionMenu 
                        positionCoordinates={coordinates} 
                        isOnTheleft={menuPosition.isOnTheLeft}
                        isTopAligned={menuPosition.isTopAligned}
                        isBottomAligned={menuPosition.isBottomAligned}
                        characters={currentGame.characters.filter(character => 
                            !foundCharacters.some(foundCharacter => foundCharacter.name === character.name)
                        )}
                        onSelect={handleValidate} 
                    />
                }
            </div>
        </div>
    );
};

export default GamePage;