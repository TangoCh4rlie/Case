import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? - 6 : 1);
    const lastMonday = new Date(today.setDate(diff));
    lastMonday.setHours(0, 0, 0, 0);

    const userColorCases = await prisma.user.findUnique({
        where: {
            username: "JohnDoe",
        },
        select: {
            cases: {
                select: {
                    date: true,
                    color: true,
                }
            }
        },
    });

    const userWithCases = await prisma.user.findUnique({
        where: {
            username: "JohnDoe",
        },
        select: {
            id: true,
            username: true,
            img: true,
            cases: {
                orderBy: {
                    date: 'asc'
                },
                where: {
                    date: {
                        gte: lastMonday,
                        lte: new Date()
                    }
                }
            }
        },
    });    
    
    if ( !userWithCases ) {
        return { user: null, cases: null };
    } else {
        while (userWithCases.cases.length < dayOfWeek) {
            const date = new Date();
            const diff: number = dayOfWeek - userWithCases.cases.length - 1;
            date.setDate(date.getDate() - diff)
            
            userWithCases.cases.push({
                id: '',
                date: date,
                description: ``,
                color: "FADBCD",
                place: null,
                photo: [],
                people: [],
                tag: [],
                userId: userWithCases.id
            });
        }
    
        const user = {id: userWithCases.id ,username: userWithCases.username, img: userWithCases.img};
        const cases = userWithCases.cases
        if ( !userColorCases ) {
            return { user , cases, color: null };
        }
        const color = userColorCases
    
        return { user , cases, color };
    }

    
};