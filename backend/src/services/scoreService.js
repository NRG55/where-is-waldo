import prisma from '../config/prisma.js';

export const saveScore = async (sessionId, username) => {
    const session = await prisma.session.findUnique({
        where: { id: sessionId }
    });

    if (!session) {
        throw new Error("SESSION_NOT_FOUND");
    };

    const endTime = new Date();
    const durationInMilliseconds = endTime.getTime() - session.startTime.getTime();

    const savedScore = await prisma.score.create({
        data: {
            gameId: session.gameId,
            username,
            time: durationInMilliseconds            
        }
    });

    await prisma.session.delete({
        where: { id: sessionId }
    });

    return savedScore;
};

export const getScores = async (gameSlug) => {
    return await prisma.score.findMany({
        where: {
            game: {
                slug: gameSlug
            }
        },
        orderBy: {
            time: 'asc'
        },
        select: {
            id: true,
            username: true,
            time: true
        }
    });
};