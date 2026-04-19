import prisma from '../config/prisma.js';

export const createGameSession = async (gameId) => {
    return await prisma.session.create({
        data: { gameId: Number(gameId) }
    });
};