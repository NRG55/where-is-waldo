import { Link } from 'react-router';

function GameCard({ title, image, path }) {
    return (
        <Link to={path} className="group block overflow-hidden rounded-xs border border-gray-100 hover:border-gray-200">        
            <div className="relative aspect-video w-full overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="h-full w-full object-cover group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-xs bg-gray-800 px-6 py-2 text-sm font-bold text-white">
                        Play
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3>{ title }</h3>            
            </div>
        </Link>
    );
};

export default GameCard;