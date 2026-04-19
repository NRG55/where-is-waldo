import * as sessionService from '../services/sessionService.js';

export const startSession = async (req, res) => {
    try {
        const session = await sessionService.createGameSession(req.body.gameId);

        res.json({ sessionId: session.id });

    } catch (error) {
        res.status(500).json({ error: "Failed to initialize game" });
    };
};