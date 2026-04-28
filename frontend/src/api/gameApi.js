const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

export const startGameSession = async (gameId) => {
    const response = await fetch(`${SERVER_DOMAIN}/sessions/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId })
    });

    if (!response.ok) {
        throw new Error("Failed to start session");
    };

    return response.json();
};

export const validateLocation = async (gameId, characterName, x, y) => {
    const response = await fetch(`${SERVER_DOMAIN}/games/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, characterName, x, y })
    });

    if (!response.ok) {
        throw new Error('Failed to validate');
    };

    return response.json();
};

export const submitScore = async (sessionId, username) => {
    const response = await fetch(`${SERVER_DOMAIN}/scores/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            sessionId, 
            username            
        })
    });

    if (!response.ok) {
        throw new Error('Failed to submit score');
    };

    return response.json();
};

export const getLeaderboard = async (gameSlug) => {
    const response = await fetch(`${SERVER_DOMAIN}/scores/leaderboard/${gameSlug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
    };

    return response.json();
};