import { Outlet } from 'react-router';
import Header from '../components/Header';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-[url('/images/background.webp')] bg-cover bg-left bg-fixed bg-no-repeat">
            <Header />

            <main className="grow p-6 flex flex-col">
                <Outlet /> 
            </main>

            <footer className="p-4 text-center text-gray-400">
                2026 Where is Waldo
            </footer>
        </div>
    );
};

export default Layout;