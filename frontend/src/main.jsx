import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GamesContextProvider from './context/GamesContextProvider.jsx'
import LeaderboardContextProvider from './context/LeaderboardContextProvider.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GamesContextProvider>
            <LeaderboardContextProvider>
                <App />
            </LeaderboardContextProvider>
        </GamesContextProvider>        
    </StrictMode>,
)