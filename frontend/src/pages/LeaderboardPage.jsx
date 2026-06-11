import { useParams, NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import useGames from '../context/GameContext';
import { getLeaderboard } from '../api/gameApi';
import { formatLeaderboardTime } from '../utils/format';
import Loader from '../components/Loader';

const LeaderboardPage = () => {
    const { gameSlug } = useParams();
    const { games, loading: gamesLoading } = useGames();
    const location = useLocation();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [scoresLoading, setScoresLoading] = useState(true);

    const highlightScoreId = location.state?.newScoreId;
    const activeGameSlug = gameSlug || (games.length > 0 ? games[0].slug : null);

    useEffect(() => {
        if (!activeGameSlug) {
            return;
        };

        const fetchScores = async () => {
            setScoresLoading(true);

            try {
                const data = await getLeaderboard(activeGameSlug);

                setLeaderboardData(data);

            } catch (error) {
                console.log("Error fetching leaderboard", error);

            } finally {
                setScoresLoading(false);
            };
        };

        fetchScores();
    }, [activeGameSlug]);

    if (gamesLoading) {
        return <Loader message="Waking up the server... This can take 20-30 seconds on the free tier. Thank you for your patience!" />;
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white">
            <h1 className="text-2xl text-center mb-8">Leaderboards</h1>

            <div className="flex border-b border-gray-200 mb-8 justify-center bg-white">
                {games.map((game) =>
                    <NavLink
                        key={game.slug}
                        to={`/leaderboard/${game.slug}`}
                        className={({ isActive }) => 
                            `flex-1 md:whitespace-nowrap pb-4 px-4 text-center text-sm border-b transition ${
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
                    scoresLoading 
                    ? 
                    <Loader />
                    : 
                    leaderboardData.length > 0 
                    ? 
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-800 text-sm">
                            <tr>
                                <th className="px-6 py-2">Rank</th>
                                <th className="px-6 py-2">Player</th>
                                <th className="px-6 py-2 text-center">Time</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {leaderboardData.map((element, index) => {
                                const isHighlighted = element.id === highlightScoreId;

                                return (
                                    <tr 
                                        key={element.id}
                                        className={isHighlighted ? "bg-gray-50 outline outline-gray-400 -outline-offset-2" : ""}
                                    >
                                        <td className="px-6 py-4 text-center text-sm text-gray-400">
                                            {index + 1}
                                        </td>
                                        <td className={`px-2 md:px-6 py-4 text-sm text-gray-800 ${isHighlighted ? "font-bold" : ""}`}>
                                            <div
                                                title={element.username} 
                                                className="truncate max-w-20 md:max-w-none"                                                
                                            >
                                                {element.username}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right text-green-700">
                                            {formatLeaderboardTime(element.time)}
                                        </td>
                                    </tr>
                                );
                            })}
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