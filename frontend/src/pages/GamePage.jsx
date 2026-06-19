import { useNavigate, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import GameTimer from '../components/GameTimer';
import NotFoundPage from './NotFoundPage';
import { submitScore, validateLocation } from '../api/gameApi';
import { useGameMapInteraction } from '../hooks/useGameMapInteraction';
import SelectionMenu from '../components/SelectionMenu';
import { useGameSession } from '../hooks/useGameSession';
import NameEntryModal from '../components/NameEntryModal';
import CharactersToFind from '../components/CharactersToFind';
import Toast from '../components/Toast';
import Loader from '../components/Loader';
import useGames from '../hooks/useGames.js';

function GamePage() {
    const { gameSlug } = useParams();
    const { games, loading } = useGames();
    const gameMapRef = useRef(null);
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [showNameEntryModal, setShowNameEntryModal] = useState(false);
    const [isSubmittingScore, setIsSubmittingScore] = useState(false);

    const currentGame = games.find(game => game.slug === gameSlug);

    const { 
        gameSessionId, 
        foundCharacters, 
        setFoundCharacters, 
        isGameOver,
        isFinalizingSession,
        finalTime 
    } = useGameSession(currentGame);

    const { 
        coordinates, 
        setCoordinates, 
        menuPosition, 
        handleGameMapClick 
    } = useGameMapInteraction(gameMapRef);

    useEffect(() => {
        if (isGameOver && finalTime !== null) {
            setShowNameEntryModal(true);
        };

    }, [isGameOver, finalTime]);    

    const handleSubmitScore = async (username) => {
        setIsSubmittingScore(true);

        try {            
            const response = await submitScore(gameSessionId, username);

            navigate(`/leaderboard/${gameSlug}`, { state: { newScoreId: response.score.id } });

        } catch (error) {
            console.log("Failed to save score", error);

        } finally {
            setIsSubmittingScore(false);
        };
    };    

    if (loading) {
        return <Loader />;
    };

    if (!currentGame) {
        return <NotFoundPage />;
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
                setFoundCharacters(prev => [
                    ...prev, 
                    { name: characterName, x: result.x, y: result.y }
                ]);

                setNotification({ 
                    message: `You found ${characterName}!`, 
                    type: "success", 
                    id: Date.now() // for a unique Toast component key so the same message still trigger a new Toast and its css transition
                });
                 
            } else {
                setNotification({ 
                    message: `That's not ${characterName}. Keep looking!`, 
                    type: "error", 
                    id: Date.now() 
                });
            };

        } catch (error) {
            console.log("Character location validation failed", error);

        } finally {
            setCoordinates(null);
        };
    };

    return (
        <div>
            <h1 className="text-xl text-center mb-4">
                { currentGame.title }
            </h1>

            <div className="sticky top-0 grid grid-cols-2 md:grid-cols-3 items-center mb-6 z-100">
                <div className="hidden md:block"/>               

                <div className="justify-self-start md:justify-self-center min-w-60">
                    <CharactersToFind 
                        characters={currentGame.characters} 
                        foundCharacters={foundCharacters} 
                    />
                </div>

                <div className="justify-self-end">
                    <GameTimer isActive={!isGameOver}  />
                </div>
            </div>
            
            <div ref={gameMapRef} className="relative overflow-auto rounded-xs border border-gray-300 cursor-crosshair">
                <img 
                    src={currentGame.imageUrl} 
                    className="block min-w-400 xl:min-w-full h-auto"
                    onClick={handleGameMapClick}
                />

                {
                    foundCharacters.map((character) =>
                        <div 
                            key={character.name}
                            className="absolute w-15 h-15 border border-green-500 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50"
                            style={{ left: `${character.x}%`, top: `${character.y}%` }}
                        >
                            <span className="absolute -top-7 bg-green-500 text-white text-xs px-1 rounded-xs">
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

            {
                notification 
                &&
                <Toast
                    key={notification.id} 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification(null)} 
                />
            }

            {
                showNameEntryModal 
                &&
                <NameEntryModal 
                    onSubmit={handleSubmitScore} 
                    isSubmitting={isSubmittingScore}
                    finalTime={finalTime}
                    onClose={() => navigate("/")} 
                />                
            }

            {
                isFinalizingSession &&
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-200">
                    <div className="bg-white p-6 rounded-xs shadow-md text-center font-bold text-gray-800">
                        <Loader />
                    </div>
                </div>
            }
        </div>
    );
};

export default GamePage;