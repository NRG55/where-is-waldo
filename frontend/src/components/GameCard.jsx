import { Link } from 'react-router';

function GameCard({ title, image, path }) {
    return (
        <Link to={path} className="relative group block overflow-hidden rounded-xs border border-gray-800">        
            <div className="aspect-video w-full overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="h-full w-full object-cover group-hover:opacity-90"
                />                
            </div>

            <div className="px-4 py-2 bg-white">
                <h3>{ title }</h3>            
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="rounded-xs bg-green-700 px-6 py-2 text-sm font-bold text-white">
                    Start Game
                </span>
            </div>
        </Link>
    );
};

export default GameCard;