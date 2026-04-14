import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import gamesRoute from './routes/gamesRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Where is Waldo API");
});

app.use('/games', gamesRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});