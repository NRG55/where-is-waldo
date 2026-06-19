import { useState } from 'react';
import LeaderboardContext from './LeaderboardContext.js';

export default function LeaderboardContextProvider({ children }) {
    const [leaderboard, setLeaderboard] = useState({});

    return (
        <LeaderboardContext.Provider value={{ leaderboard, setLeaderboard }}>
            {children}
        </LeaderboardContext.Provider>
    );
}