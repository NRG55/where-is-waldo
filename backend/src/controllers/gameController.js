import * as gameService from '../services/gameService.js';

export const getGames = async (req, res) => {
    try {
        const games = await gameService.getAllGamesWithCharacters();

        res.json(games);

    } catch (error) {
        res.status(500).json({ error: "Database error" });
    };
};

export const validateLocation = async (req, res) => {
    const { gameId, characterName, x, y } = req.body;

    try {
        const result = await gameService.checkCharacterLocation(gameId, characterName, x, y);

        if (result.error === "NOT_FOUND") {
            return res.status(404).json({ message: "Character not found" });
        };

        if (result.found) {
            return res.json({ 
                found: true,
                x: result.x,
                y: result.y
            });
        };
        
        res.json({ found: false });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    };
};