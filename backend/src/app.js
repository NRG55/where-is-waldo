import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import prisma from './config/prisma.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Where is Waldo API");
});

app.get('/games', async (req, res) => {
    try {
        const games = await prisma.game.findMany({
            include: {
                characters: true
            }
        });
        console.log(games)
        res.json(games);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch games from database" });
    };
});

app.post('/validate-location', async (req, res) => {
    const { gameId, characterName, x, y } = req.body;
    const margin = 5; // 3% character coordinates margin

    try {
        const character = await prisma.character.findFirst({
            where: {
                gameId: parseInt(gameId),
                name: { equals: characterName }
            }
        });

        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        };

        const isFound = (x + margin) >= character.xCoordinate
                     && (x - margin) <= character.xCoordinate
                     && (y + margin) >= character.yCoordinate
                     && (y - margin) <= character.yCoordinate;

        if (isFound) {           
            return res.json({ found: true, message: `You found ${character.name}!` });
        };
        
        res.json({ found: false, message: "Wrong character, keep looking!" });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong on a server side" });
    };   
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});