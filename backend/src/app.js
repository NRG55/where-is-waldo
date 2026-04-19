import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import gameRoute from './routes/gameRoute.js';
import scoreRoute from './routes/scoreRoute.js';
import sessionRoute from './routes/sessionRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Where is Waldo API is running");
});

app.use('/games', gameRoute);
app.use('/scores', scoreRoute);
app.use('/sessions', sessionRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});