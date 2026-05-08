import { Pool} from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/index.js';
import { beachCharacters, skiCharacters, spaceCharacters } from './seedData.js';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.character.deleteMany();
    await prisma.game.deleteMany();

    await prisma.game.create({
        data: {
            title: "Summer Beach",
            slug: "beach",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1778157010/beach_ikou4u.jpg",
            characters: {
                create: beachCharacters
            }
        }
    });

    await prisma.game.create({
        data: {
            title: "Ski Resort",
            slug: "ski",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1778156606/ski_diwpsp.jpg",
            characters: {
                create: skiCharacters
            }
        }
    });

    await prisma.game.create({
        data: {
            title: "Space",
            slug: "space",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1778156994/space_ytzhlk.jpg",
            characters: {
                create: spaceCharacters
            }
        }
    });

    console.log("Where_is_waldo db seeded successfully!");
};

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });