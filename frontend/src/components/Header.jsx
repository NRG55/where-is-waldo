import { Link, NavLink, useParams } from 'react-router';
import logo from "../assets/logo.png"; 
import useGames from '../hooks/useGames.js';

const Header = () => {
    const { games } = useGames();
    const { gameSlug } = useParams();    
   
    const currentGameSlug = gameSlug || (games.length > 0 ? games[0].slug : "");

    return (
        <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-300">
            <Link to="/" className="flex items-center gap-2 group">
                <img 
                    src={logo} 
                    alt="Where's Waldo Logo" 
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
                />
                <span className="text-gray-800 font-bold group-hover:text-black transition">
                    Where's Waldo
                </span>
            </Link>                          
                
            <NavLink 
                to={`/leaderboard/${currentGameSlug}`} 
                className={({ isActive }) => 
                    `font-bold text-sm text-gray-800 transition border-b hover:text-black ${
                        isActive ? "border-gray-800" : "border-transparent"
                    }`
                }
            >
                Leaderboard
            </NavLink>
        </header>
    );
};

export default Header;