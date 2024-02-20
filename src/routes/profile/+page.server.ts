import prisma from "$lib/prisma";
import { Color } from "$lib/types/case";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const lastMonday = new Date(today.setDate(diff));

    const userWithCases = await prisma.user.findUnique({
        where: {
            username: "JohnDoe",
        },
        select: {
            username: true,
            img: true,
            cases: {
                where: {
                    date: {
                        gte: lastMonday,
                        lte: new Date()
                    }
                }
            }
        },
    });

    if (!userWithCases) {
        return { user: null, cases: null };
    }

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
            userId: userWithCases.cases[0].userId
        });
    }

    const user = {username: userWithCases.username, img: userWithCases.img};
    const cases = userWithCases.cases

    return { user , cases };
};