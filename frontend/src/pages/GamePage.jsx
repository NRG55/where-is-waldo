import { useParams } from 'react-router';
import games from '../data/games';
import GameTimer from '../components/GameTimer';

function GamePage() {
    const { gameSlug } = useParams();

    const currentGame = games.find(game => game.slug === gameSlug);

    if (!currentGame) {
        return <h1>Game not found, please try another game.</h1>;
    };

    return (
        <div>
            <h1 className="text-xl text-center mb-4">
                { currentGame.title }
            </h1>
            
            <GameTimer />

            <div className="relative border border-gray-400 rounded-xs overflow-hidden">
                <img 
                    src={currentGame.image} 
                    alt={currentGame.title} 
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}

export default GamePage;