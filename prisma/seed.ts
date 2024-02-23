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
                        date: new Date('2024-02-03'),
                        color: 'joy',
                        place: 'Location 1',
                        photo: ['path/to/photo1.jpg'],
                        people: ['Person 1', 'Person 2'],
                        tag: ['Tag 1', 'Tag 2'],
                    },
                    {
                        description: 'Case 2',
                        date: new Date('2024-02-05'),
                        color: 'anger',
                        place: 'Location 2',
                        photo: ['path/to/photo2.jpg'],
                        people: ['Person 3', 'Person 4'],
                        tag: ['Tag 3', 'Tag 4'],
                    },
                    {
                        description: 'Case 3',
                        date: new Date('2024-02-07'),
                        color: 'love',
                        place: 'Location 3',
                        photo: ['path/to/photo3.jpg'],
                        people: ['Person 5', 'Person 6'],
                        tag: ['Tag 5', 'Tag 6'],
                    },
                    {
                        description: 'Case 4',
                        date: new Date('2024-02-08'),
                        color: 'sadness',
                        place: 'Location 4',
                        photo: ['path/to/photo4.jpg'],
                        people: ['Person 7', 'Person 8'],
                        tag: ['Tag 7', 'Tag 8'],
                    },
                    {
                        description: 'Case 5',
                        date: new Date('2024-02-09'),
                        color: 'zen',
                        place: 'Location 5',
                        photo: ['path/to/photo5.jpg'],
                        people: ['Person 9', 'Person 10'],
                        tag: ['Tag 9', 'Tag 10'],
                    },
                    {
                        description: 'Case 6',
                        date: new Date('2024-02-11'),
                        color: 'lazyness',
                        place: 'Location 6',
                        photo: ['path/to/photo6.jpg'],
                        people: ['Person 11', 'Person 12'],
                        tag: ['Tag 11', 'Tag 12'],
                    },
                    {
                        description: 'Case 7',
                        date: new Date('2024-02-14'),
                        color: 'joy',
                        place: 'Location 7',
                        photo: ['path/to/photo7.jpg'],
                        people: ['Person 13', 'Person 14'],
                        tag: ['Tag 13', 'Tag 14'],
                    },
                    {
                        description: 'Case 8',
                        date: new Date('2024-02-15'),
                        color: 'anger',
                        place: 'Location 8',
                        photo: ['path/to/photo8.jpg'],
                        people: ['Person 15', 'Person 16'],
                        tag: ['Tag 15', 'Tag 16'],
                    },
                    {
                        description: 'Case 9',
                        date: new Date('2024-02-16'),
                        color: 'love',
                        place: 'Location 9',
                        photo: ['path/to/photo9.jpg'],
                        people: ['Person 17', 'Person 18'],
                        tag: ['Tag 17', 'Tag 18'],
                    },
                    {
                        description: 'Case 10',
                        date: new Date('2024-02-17'),
                        color: 'anxious',
                        place: 'Location 10',
                        photo: ['path/to/photo10.jpg'],
                        people: ['Person 19', 'Person 20'],
                        tag: ['Tag 19', 'Tag 20'],
                    }
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