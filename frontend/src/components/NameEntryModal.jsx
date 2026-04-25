import { useState } from 'react';
import { Link } from 'react-router';

const NameEntryModal = ({ onSubmit, isSubmitting }) => {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Stop page reload

        onSubmit(name)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
            <div className="max-w-sm w-full p-8 text-center bg-white rounded-xs">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Congratulations!
                </h2>

                <p className="text-gray-600 mb-4 text-left">
                    You found all characters. Enter your name for the leaderboard.
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