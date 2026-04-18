const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

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

export const submitScore = async (gameId, username, time) => {
    const response = await fetch(`${SERVER_DOMAIN}/scores/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            gameId, 
            username, 
            time
        })
    });

    if (!response.ok) {
        throw new Error('Failed to submit score');
    };

    return response.json();
};