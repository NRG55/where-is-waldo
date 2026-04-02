import { Outlet, Link } from 'react-router';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 py-4 flex justify-between gap-4">
                <Link to="/" className="hover:text-gray-600">Home</Link>                
                    
                <Link to="/leaderboard" className="hover:text-gray-600">Leaderboard</Link>                
            </header>

            <main className="grow p-6 flex flex-col">
                <Outlet /> 
            </main>

            <footer className="p-4 text-center">
                2026 Where is Waldo
            </footer>
        </div>
    );
};

export default Layout;