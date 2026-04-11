const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Where is Waldo API");
});

app.post('/validate-location', async (req, res) => {
    const { gameId, characterName, x, y } = req.body;
    const margin = 3; // 3% character coordinates margin

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

        const isFound = (x - character.xCoordinate) <= margin 
                     && (y - character.yCoordinate) <= margin;

        if (isFound) {           
            return res.json({ found: true, message: `You found ${character.name}!` });
        };
        
        res.json({ found: false, message: "Wrong character, keep looking!" });

    } catch (error) {
        res.status(500).json({ error: "Something wrong on a server side" });
    };   
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});