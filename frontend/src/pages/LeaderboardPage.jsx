import { useParams, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import useGames from '../context/GameContext';
import { getLeaderboard } from '../api/gameApi';

const LeaderboardPage = () => {
    const { gameSlug } = useParams();
    const { games } = useGames();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);

            try {
                const data = await getLeaderboard(gameSlug);

                setLeaderboardData(data);

            } catch (error) {
                console.log("Error fetching leaderboard", error);

            } finally {
                setLoading(false);
            };
        };

        fetchScores();
    }, [gameSlug]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl text-center mb-8">Leaderboards</h1>

            <div className="flex border-b border-gray-200 mb-8 justify-center space-x-4">
                {games.map((game) =>
                    <NavLink
                        key={game.slug}
                        to={`/leaderboard/${game.slug}`}
                        className={({ isActive }) => 
                            `pb-4 px-4 text-sm border-b transition ${
                                isActive 
                                ? "border-black text-black" 
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`
                        }
                    >
                        {game.title}
                    </NavLink>
                )}
            </div>

            <div className="overflow-hidden">
                {
                    loading 
                    ? 
                    <div className="p-10 text-center text-gray-500">Loading leaderboard...</div>
                    : 
                    leaderboardData.length > 0 
                    ? 
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-800 text-sm">
                            <tr>
                                <th className="px-6 py-2 text-center">Rank</th>
                                <th className="px-6 py-2 text-center">Player</th>
                                <th className="px-6 py-2 text-center">Time</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {leaderboardData.map((element, index) =>
                                <tr key={element.id}>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {element.username}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        {(element.time / 1000).toFixed(2)}s
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    : 
                    <div className="p-10 text-center text-gray-500">
                        No scores yet.
                    </div>
                }
            </div>
        </div>
    );
};

export default LeaderboardPage;