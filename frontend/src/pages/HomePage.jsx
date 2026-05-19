import useGames from '../context/GameContext';
import GameCard from '../components/GameCard';

function HomePage() {
    const { games, loading } = useGames();

    if (loading) {
        return <p>Loading games...</p>;
    };     

    return (
        <div className="mx-auto max-w-6xl py-10">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    Ready to find Waldo?
                </h1>                

                <div className="mt-6 inline-block rounded-xs bg-white p-6 text-left border border-gray-200 max-w-xl">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                        How to Play
                    </h2>
                    
                    <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                        <li>Choose a map from the selection below.</li>
                        <li>Each map has <strong>3 hidden characters listed above the map</strong> for you to find.</li>
                        <li>Click on the map when you spot a character to open the selection menu.</li>
                        <li>Select the correct name from the menu to confirm your find.</li>
                        <li>Find all characters as fast as you can, with the option to save your name to the leaderboard!</li>
                    </ul>
                </div>
            </div>

            <h2 className="mb-8 text-center text-2xl">
                Choose a map
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {
                    games.map((game) => (
                        <GameCard 
                            key={game.id} 
                            title={game.title} 
                            image={game.imageUrl} 
                            path={`/game/${game.slug}`} 
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;