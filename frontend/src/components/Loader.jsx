function Loader({ message }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-black rounded-full animate-spin" />

            <p className="text-gray-500 text-sm tracking-wide animate-pulse">
                Loading...
            </p>

            <p className="text-center text-gray-700 max-w-sm leading-relaxed mt-2">
                {message}
            </p>
        </div>
    );
};

export default Loader;