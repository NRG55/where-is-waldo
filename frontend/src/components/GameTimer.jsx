import { useState, useEffect } from 'react';

function GameTimer({ isActive }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);

        } else {           
            clearInterval(interval);
        };

        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const mins = minutes < 10 ? `0${minutes}` : minutes;
        const secs = seconds < 10 ? `0${seconds}` : seconds;

        return `${mins} : ${secs}`;
    };

    return (
        <div className="flex">
            <div className="mr-4 border border-gray-100 rounded-xs px-4 py-2 bg-white">
                { formatTime(seconds) }
            </div>
        </div>
    );
};

export default GameTimer;