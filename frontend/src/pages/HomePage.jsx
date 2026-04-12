import useGames from '../context/GameContext';
import GameCard from '../components/GameCard';

function HomePage() {
    const { games, loading } = useGames();

    if (loading) {
        return <p>Loading games...</p>;
    };     

    return (
        <div className="mx-auto max-w-6xl py-10">
            <h1 className="mb-8 text-center text-2xl">
                Choose a map
            </h1>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {
                    games.map((game) => (
                        <GameCard 
                            key={game.id} 
                            title={game.title} 
                            image="/images/game-1.png" 
                            path={`/game/${game.slug}`} 
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;