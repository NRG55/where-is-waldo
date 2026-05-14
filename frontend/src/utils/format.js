const formatLeaderboardTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const centiseconds = Math.floor((milliseconds / 10) % 100);

    const mins = minutes < 10 ? `0${minutes}` : minutes;
    const secs = seconds < 10 ? `0${seconds}` : seconds;
    const cents = centiseconds < 10 ? `0${centiseconds}` : centiseconds;

    return `${mins}:${secs}.${cents}`;
};

export { formatLeaderboardTime };