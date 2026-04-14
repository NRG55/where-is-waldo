import { useParams } from 'react-router';
import { useRef } from 'react';
import useGames from '../context/GameContext';
import GameTimer from '../components/GameTimer';
import NotFoundPage from './NotFoundPage';
import { validateLocation } from '../api/gameApi';
import { useGameLogic } from '../hooks/useGameLogic';
import SelectionMenu from '../components/SelectionMenu';

function GamePage() {
    const { gameSlug } = useParams();
    const { games, loading } = useGames();    
    const gameMapRef = useRef(null);

    const { coordinates, setCoordinates, menuPosition, handleGameMapClick } = useGameLogic(gameMapRef);    

    if (loading) {
        return <div>Loading Game...</div>;
    };

    const currentGame = games.find(game => game.slug === gameSlug);
    
    if (!currentGame) {
        return <NotFoundPage />;
    };

     const handleValidate = async (characterName) => {
        // Coordinates to percentages (for different screen sizes)
        const x = (coordinates.x / coordinates.width) * 100;
        const y = (coordinates.y / coordinates.height) * 100;

        try {
            const result = await validateLocation(currentGame.id, characterName, x, y);
            
            if (result.found) {                
                console.log(result.message);               
                 
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
                    coordinates 
                    &&
                    <SelectionMenu 
                        positionCoordinates={coordinates} 
                        isOnTheleft={menuPosition.isOnTheLeft}
                        isTopAligned={menuPosition.isTopAligned}
                        isBottomAligned={menuPosition.isBottomAligned}
                        characters={currentGame.characters} 
                        onSelect={handleValidate} 
                    />
                }
            </div>
        </div>
    );
};

export default GamePage;