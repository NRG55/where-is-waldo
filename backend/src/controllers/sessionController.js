import * as sessionService from '../services/sessionService.js';

export const startSession = async (req, res) => {
    const { gameId } = req.body;

    if (!gameId) {
        return res.status(400).json({ error: "gameId is required" });
    };

    try {
        const session = await sessionService.createGameSession(gameId);

        res.status(201).json({ sessionId: session.id });

    } catch (error) {
        console.log("Start session error:", error);

        res.status(500).json({ error: "Failed to start game session" });
    };
};