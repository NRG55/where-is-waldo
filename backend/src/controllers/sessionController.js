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

export const finishSession = async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
    };

    try {
        const result = await sessionService.finishGameSession(sessionId);

        return res.status(200).json({ time: result.time });

    } catch (error) {
        console.log("Finish session error:", error);

        if (error.message === "SESSION_NOT_FOUND") {
            return res.status(404).json({ error: "Game session expired or does not exist" });
        };

        return res.status(500).json({ error: "Failed to finish game session" });
    };
};