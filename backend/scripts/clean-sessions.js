import prisma from "../src/config/prisma.js";

async function cleanSessions() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    try {
        const result = await prisma.session.deleteMany({
            where: {
                endTime: null,
                startTime: { lt: oneHourAgo }
            }
        });

        console.log(`Cleared ${result.count} unfinished sessions.`);

    } catch (error) {
        console.error("Sessions cleanup failed:", error);

    } finally {
        await prisma.$disconnect();
    };
};

cleanSessions();