import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? - 6 : 1);
    const lastMonday = new Date(today.setDate(diff));
    lastMonday.setHours(0, 0, 0, 0);

    console.log("today: ", new Date());
    console.log("lastMonday: ", lastMonday);
    

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
            userWithCases.cases.push({
                id: '',
                date: today,
                description: '',
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
    
        return { user , cases };
    }

    
};