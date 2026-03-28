import { createBrowserRouter } from 'react-router';
import Layout from '../layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <h1>Something went wrong. Please try again later.</h1>,
        children: [
            {
                index: true,
                element: <h1>Home</h1>
            },
            {
                path: 'game',
                element: <h1>Game</h1>
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