import { useState } from 'react';
import { Link } from 'react-router';
import { formatLeaderboardTime } from '../utils/format';

const NameEntryModal = ({ onSubmit, isSubmitting, finalTime, onClose }) => {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Stop page reload

        onSubmit(name)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-200">
            <div
                role="dialog" 
                aria-modal="true" 
                className="relative max-w-sm w-full p-8 text-center bg-white rounded-xs"
            >
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-4 right-4 cursor-pointer p-1 text-gray-500 hover:text-gray-800 transition"
                    aria-label="Close modal"
                >
                    <svg 
                        xmlns="w3.org" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="currentColor" 
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Congratulations!
                </h2>

                {
                    finalTime !== null 
                    && 
                    finalTime !== undefined 
                    &&
                    <div className="my-6 p-4 bg-gray-50 rounded-xs">

                        <p className=" mb-1 text-xs font-semibold tracking-wider text-gray-400">
                            YOUR TIME
                        </p>                        

                        <div className="text-4xl tracking-wider text-green-700">
                            {formatLeaderboardTime(finalTime)}
                        </div>
                    </div>
                }

                <p className="mb-4 text-gray-600 text-left">
                    Well done! Would you like to add your name for the leaderboard?
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input 
                        autoFocus
                        type="text"
                        placeholder="Your name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xs"
                        maxLength={20}
                        required
                    />
                    
                    <button 
                        type="submit"
                        disabled={isSubmitting || !name.trim()}
                        className="w-full bg-gray-700 hover:bg-gray-900 disabled:bg-gray-400 text-white font-bold py-3 rounded-xs transition"
                    >
                        { isSubmitting ? "Saving..." : "Submit Score" }
                    </button>

                    <Link 
                        to="/" 
                        className="block w-full text-gray-500 hover:text-gray-800 text-sm py-2 transition"
                    >
                        Don't save, back to homepage
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default NameEntryModal;