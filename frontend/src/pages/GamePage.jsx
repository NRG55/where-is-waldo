import { useParams } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import games from '../data/games';
import GameTimer from '../components/GameTimer';

function GamePage() {
    const { gameSlug } = useParams();
    const [coordinates, setCoordinates] = useState(null);
    const [isCloseToRight, setIsCloseToRight] = useState(false);
    const [isCloseToBottom, setIsCloseToBottom] = useState(false);
    const containerRef = useRef(null);

    const currentGame = games.find(game => game.slug === gameSlug);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setCoordinates(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!currentGame) return <h1>Game not found.</h1>;

    const BOX_SIZE = 60; // pixels
    const MENU_WIDTH = 180;
    const GAP = 10;

    const handleImageClick = (event) => {
        const gameMap = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - gameMap.left;
        const y = event.clientY - gameMap.top;

        setIsCloseToRight(x + (BOX_SIZE / 2) + GAP + MENU_WIDTH > gameMap.width);
        // TODO: to change height value after adding more characters
        setIsCloseToBottom(y + 80 > gameMap.height);
        
        setCoordinates({ x, y });
    };

    return (
        <div>
            <h1 className="text-xl text-center mb-4">
                { currentGame.title }
            </h1>
            
            <GameTimer />

            <div ref={containerRef} className="relative w-full rounded-xs border border-gray-300">
                <img 
                    src={currentGame.image} 
                    className="cursor-crosshair w-full block"
                    onClick={handleImageClick}
                />
                
                {
                    coordinates 
                    &&
                    <div 
                        className="absolute"
                        style={{ 
                            left: coordinates.x, 
                            top: coordinates.y,
                            transform: 'translate(-50%, -50%)' 
                        }}
                    >
                        <div 
                            style={{ width: BOX_SIZE, height: BOX_SIZE }}
                            className="border border-white rounded-xs shadow-[0_0_0_2px_rgba(0,0,0,0.5)]" 
                        />                    

                        <div 
                            className={`absolute bg-white rounded-xs 
                                        ${isCloseToBottom ? 'bottom-0' : 'top-0'}`}
                            style={{ 
                                width: MENU_WIDTH,                            
                                left: isCloseToRight ? -(MENU_WIDTH + GAP) : BOX_SIZE + GAP,
                                top: isCloseToBottom ? 'auto' : 0,
                                bottom: isCloseToBottom ? 0 : 'auto' 
                            }}
                        >
                            {
                                currentGame.characters.map(character => (
                                    <button 
                                        key={character.name} 
                                        className="cursor-pointer w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log(`Clicked on ${character.name}`)}
                                    >
                                        { character.name }
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default GamePage;