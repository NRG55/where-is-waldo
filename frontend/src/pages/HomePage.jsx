import GameCard from '../components/GameCard';
import games from '../data/games';

function HomePage() {
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
                            image={game.image} 
                            path={`/game/${game.slug}`} 
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;