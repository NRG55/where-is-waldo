import { useEffect, useState } from "react";

const Toast = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // showTimer for a small delay to trigger the css transition between notifications if old one is still on the screen
        const showTimer = setTimeout(() => setIsVisible(true), 10);        
        const fadeTimer = setTimeout(() => setIsVisible(false), 2700);
        const closeTimer = setTimeout(onClose, 3000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(fadeTimer);
            clearTimeout(closeTimer);
        };
    }, [message, onClose]);

    const backgroundColor = type === "success" ? "bg-green-600" : "bg-red-600";

    return (
        <div 
            className={`
                fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xs text-white shadow-2xl z-100 
                transition-all duration-300 ease-in-out
                ${backgroundColor}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
        >
            <p className="font-bold text-sm">
                {message}
            </p>
        </div>
    );
};

export default Toast;