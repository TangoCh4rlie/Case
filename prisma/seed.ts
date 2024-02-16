import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'JohnDoe',
            img: 'path/to/image.jpg',
            email: 'johndoe@example.com',
            cases: {
                create: [
                    {
                        description: 'Case 1',
                        place: 'Location 1',
                        photo: ['path/to/photo1.jpg'],
                        people: ['Person 1', 'Person 2'],
                        tag: ['Tag 1', 'Tag 2'],
                    },
                    {
                        description: 'Case 2',
                        place: 'Location 2',
                        photo: ['path/to/photo2.jpg'],
                        people: ['Person 3', 'Person 4'],
                        tag: ['Tag 3', 'Tag 4'],
                    },
                    {
                        description: 'Case 3',
                        place: 'Location 3',
                        photo: ['path/to/photo3.jpg'],
                        people: ['Person 5', 'Person 6'],
                        tag: ['Tag 5', 'Tag 6'],
                    },
                    {
                        description: 'Case 4',
                        place: 'Location 4',
                        photo: ['path/to/photo4.jpg'],
                        people: ['Person 7', 'Person 8'],
                        tag: ['Tag 7', 'Tag 8'],
                    },
                ],
            },
        },
        include: {
            cases: true,
        },
    });

    console.log('User created:', user);
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });