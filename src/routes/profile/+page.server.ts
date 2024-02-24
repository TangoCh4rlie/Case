import prisma from "$lib/prisma";
import { type Case } from "$lib/types/case";
import type { PageServerLoad } from "./$types";

export const prerender = true;

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
        const user = {id: userWithCases.id ,username: userWithCases.username, img: userWithCases.img}

        const casesWeek: Case[] = remplirDatesManquantesSemaine(userWithCases?.cases);

        const cases = casesWeek
        if ( !userColorCases ) {
            return { user , cases, color: null };
        }
        const color = userColorCases
    
        return { user , cases, color };
    }
};

function remplirDatesManquantesSemaine(cases: Case[]): Case[] {
    const nbCases = new Date().getDay();
    const finalData = new Array(nbCases === 0 ? 7 : nbCases).fill(null);

    cases.forEach((c) => {
        if (c.date.getDay() === 0)
            finalData[6] = c;
        else
            finalData[c.date.getDay() - 1] = c;
    });

    let i = 0;
    finalData.forEach((c) => {
        if (c === null) {
            const date = new Date();
            const diff: number = (date.getDay() + 6) % 7 - i;
            date.setDate(date.getDate() - diff)
            finalData[i] = {
                id: '',
                date: date,
                description: ``,
                color: "default",
                place: null,
                photo: [],
                people: [],
                tag: [],
                userId: ''
            };
        }
        i++;
    });
    
    return finalData;
    
}