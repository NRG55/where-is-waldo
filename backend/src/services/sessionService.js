import prisma from '../config/prisma.js';

export const createGameSession = async (gameId) => {
    return await prisma.session.create({
        data: { gameId: Number(gameId) }
    });
};

export const finishGameSession = async (sessionId) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId }
    });

    if (!session) {
        throw new Error("SESSION_NOT_FOUND");
    };

    const currentTime = new Date();

    await prisma.session.update({
        where: { id: sessionId },
        data: { endTime: currentTime }
    });

    const durationInMilliseconds = currentTime.getTime() - session.startTime.getTime();

    return { time: durationInMilliseconds };
};