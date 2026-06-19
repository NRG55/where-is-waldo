import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LeaderboardContext from '../context/LeaderboardContext.js';
import { getLeaderboard } from '../api/gameApi.js';

export default function useLeaderboard(gameSlug = null) {
    const context = useContext(LeaderboardContext);

    if (!context) {
        throw new Error('useLeaderboard must be used inside a <LeaderboardContextProvider /> component.');
    }

    const { leaderboard, setLeaderboard } = context;
    const [scoresLoading, setScoresLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [newScoreId, setNewScoreId] = useState(() => location.state?.newScoreId);

    const scoreIdToHighlight = location.state?.newScoreId;
    const cachedCurrentGameData = gameSlug ? leaderboard[gameSlug] : null;

    useEffect(() => {
        if (scoreIdToHighlight) {
            setNewScoreId(scoreIdToHighlight);
        }

    }, [scoreIdToHighlight]);

    useEffect(() => {       
        if (!gameSlug) {
            return
        }
       
        if (cachedCurrentGameData && !scoreIdToHighlight) {
            return;
        }
        
        if (scoreIdToHighlight) {
            navigate(location.pathname, { replace: true, state: {} });
        }

        const fetchScores = async () => {
            setScoresLoading(true);

            try {
                const data = await getLeaderboard(gameSlug);

                setLeaderboard(prev => ({
                    ...prev,
                    [gameSlug]: data
                }));

            } catch (error) {
                console.log("Error fetching leaderboard", error);

            } finally {
                setScoresLoading(false);
            }
        };

        fetchScores();
    }, [gameSlug, scoreIdToHighlight, cachedCurrentGameData, setLeaderboard, navigate, location.pathname]);
    
    return {
        leaderboardData: gameSlug ? (leaderboard[gameSlug] || []) : [],
        scoreIdToHighlight: newScoreId,
        scoresLoading,                
    };
}