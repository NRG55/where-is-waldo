import { Link, NavLink, useParams } from 'react-router';
import useGames from '../context/GameContext';
import logo from "../assets/logo.png"; 

const Header = () => {
    const { games } = useGames();
    const { gameSlug } = useParams();    
   
    const currentGameSlug = gameSlug || (games.length > 0 ? games[0].slug : "");

    return (
        <header className="px-6 py-4 flex justify-between items-center bg-[#002B55] border-b border-gray-900">
            <Link to="/" className="flex items-center gap-2 group">
                <img 
                    src={logo} 
                    alt="Where's Waldo Logo" 
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
                />
                <span className="text-gray-200 font-bold group-hover:text-white transition">
                    Where's Waldo
                </span>
            </Link>                          
                
            <NavLink 
                to={`/leaderboard/${currentGameSlug}`} 
                className={({ isActive }) => 
                    `font-bold text-sm text-gray-200 transition border-b  hover:text-white ${
                        isActive ? "border-white" : "text-gray-200 border-transparent"
                    }`
                }
            >
                Leaderboard
            </NavLink>
        </header>
    );
};

export default Header;