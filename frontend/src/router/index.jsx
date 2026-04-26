import { createBrowserRouter } from 'react-router';
import Layout from '../layout';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import NotFoundPage from '../pages/NotFoundPage';
import LeaderboardPage from '../pages/LeaderboardPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <h1>Something went wrong. Please try again later.</h1>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'game/:gameSlug',
                element: <GamePage />
            },
            {
                path: 'leaderboard/:gameSlug',
                element: <LeaderboardPage />
            },
            { 
                path: '*', 
                element: <NotFoundPage /> 
            }
        ]
    }
]);

export default router;