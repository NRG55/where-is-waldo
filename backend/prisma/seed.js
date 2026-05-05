import { Pool} from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/index.js'; // Ensure .js extension
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
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1777988205/beach_cudhzh.png",
            characters: {
                create: [
                    { name: "Waldo", imageUrl: "", xCoordinate: 50, yCoordinate: 50 },
                    { name: "Wizard", imageUrl: "", xCoordinate: 0, yCoordinate: 0 },
                    { name: "Wenda", imageUrl: "", xCoordinate: 0, yCoordinate: 0 }
                ]
            }
        }
    });

    await prisma.game.create({
        data: {
            title: "Ski Resort",
            slug: "ski",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1777988222/ski_mhcifi.png",
            characters: {
                create: [
                    { name: "Waldo", imageUrl: "", xCoordinate: 0, yCoordinate: 0 },
                    { name: "Wizard", imageUrl: "", xCoordinate: 0, yCoordinate: 0 },
                    { name: "Wenda", imageUrl: "", xCoordinate: 0, yCoordinate: 0 }
                ]
            }
        }
    });

    await prisma.game.create({
        data: {
            title: "City",
            slug: "city",
            imageUrl: "https://res.cloudinary.com/dlc8atazj/image/upload/v1777988237/city_nildyy.png",
            characters: {
                create: [
                    { name: "Waldo", imageUrl: "", xCoordinate: 0, yCoordinate: 0 },
                    { name: "Wizard", imageUrl: "", xCoordinate: 0, yCoordinate: 0 },
                    { name: "Wenda", imageUrl: "", xCoordinate: 0, yCoordinate: 0 }
                ]
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