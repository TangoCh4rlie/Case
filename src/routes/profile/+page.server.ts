import prisma from "$lib/prisma";
import { type Case } from "$lib/types/case";
import { remplirDatesManquantesSemainePrecedente } from "$lib/utils/manipulateWeek";
import moment from "moment";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = async (event) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? - 6 : 1);
    const lastMonday = new Date(today.setDate(diff));
    lastMonday.setHours(0, 0, 0, 0);    

    const session = await event.locals.auth();    

    const userColorCases = await prisma.user.findUnique({
        where: {
            name: session?.user?.name as string,
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
            name: session?.user?.name as string,
        },
        select: {
            id: true,
            name: true,
            image: true,
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
        const user = {id: userWithCases.id ,name: userWithCases.name, img: userWithCases.image}

        const casesWeek: Case[] = remplirDatesManquantesSemainePrecedente(userWithCases?.cases, moment().toDate());

        const cases = casesWeek

        if ( !userColorCases ) {
            return { user , cases, color: null };
        }
        const color = userColorCases
        
        return { user , cases, color };
    }
};