import * as scoreService from '../services/scoreService.js';

export const submitScore = async (req, res) => {
    const { gameId, username, time } = req.body;

    if (!username || !time) {
        return res.status(400).json({ error: "Username and time are required" });
    };

    try {
        const savedScore = await scoreService.saveScore(gameId, username, time);

        res.status(201).json({ 
            message: "Score saved!", 
            score: savedScore,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to save score" });
    };
};