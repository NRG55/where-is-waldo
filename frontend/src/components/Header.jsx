import { Link, NavLink, useParams } from 'react-router';
import useGames from '../context/GameContext'; 

const Header = () => {
    const { games } = useGames();
    const { gameSlug } = useParams();    
   
    const currentGameSlug = gameSlug || (games.length > 0 ? games[0].slug : "");

    return (
        <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
            <Link to="/" className="text-gray-700 font-bold hover:text-black transition">
                Where's Waldo
            </Link>                         
                
            <NavLink 
                to={`/leaderboard/${currentGameSlug}`} 
                className={({ isActive }) => 
                    `text-sm transition border-b  ${
                        isActive ? "text-black border-black" : "text-gray-500 border-transparent hover:text-black"
                    }`
                }
            >
                Leaderboard
            </NavLink>
        </header>
    );
};

export default Header;