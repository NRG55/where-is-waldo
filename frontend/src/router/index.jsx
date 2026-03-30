import { createBrowserRouter } from 'react-router';
import Layout from '../layout';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';

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
                path: 'leaderboard',
                element: <h1>Leaderboard</h1>
            },
            { 
                path: '*', 
                element: <h1>Page not found</h1> 
            }
        ]
    }
]);

export default router;