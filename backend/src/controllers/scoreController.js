import * as scoreService from '../services/scoreService.js';

export const submitScore = async (req, res) => {
    const { sessionId, username } = req.body;

    if (!sessionId || !username) {
        return res.status(400).json({ error: "Session ID and username are required" });
    };

    try {
        const savedScore = await scoreService.saveScore(sessionId, username);

        res.status(201).json({ 
            message: "Score saved!", 
            score: savedScore,
        });

    } catch (error) {
        console.log(error);

        if (error.message === "SESSION_NOT_FOUND") {
            return res.status(404).json({ error: "Invalid game session" });
        };

        res.status(500).json({ error: "Failed to save score" });
    };
};