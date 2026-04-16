import prisma from '../config/prisma.js';

export const saveScore = async (gameId, username, time) => {
    return await prisma.score.create({
        data: { 
            gameId: Number(gameId), 
            username, 
            time: Number(time) 
        },        
    });
};