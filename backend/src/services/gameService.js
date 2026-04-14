import prisma from '../config/prisma.js';

export const getAllGamesWithCharacters = async () => {
    return await prisma.game.findMany({
        include: { characters: true }
    });
};

export const checkCharacterLocation = async (gameId, characterName, x, y) => {
    const margin = 5;

    const character = await prisma.character.findFirst({
        where: {
            gameId: Number(gameId),
            name: characterName
        }
    });

    if (!character) {
        return { error: "NOT_FOUND" };
    };

    const isFound = (x + margin) >= character.xCoordinate
                 && (x - margin) <= character.xCoordinate
                 && (y + margin) >= character.yCoordinate
                 && (y - margin) <= character.yCoordinate;

    if (isFound) {
        return { found: true, characterName: character.name };
    };

    return { found: false };
};