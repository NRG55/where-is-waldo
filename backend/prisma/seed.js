const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../generated/prisma');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.character.deleteMany();
    await prisma.game.deleteMany();

    await prisma.game.create({
            data: {
            name: "Game 1",
            imageUrl: "",
            characters: {
                create: [
                    { name: "Waldo", imageUrl: "", xCoordinate: 10, yCoordinate: 10 },
                    { name: "Character 2", imageUrl: "", xCoordinate: 20, yCoordinate: 20 },
                    { name: "Character 3", imageUrl: "", xCoordinate: 30, yCoordinate: 30 }
                ]
            }
            }
        });

    console.log("Where_is_waldo db seeded successfully!");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });