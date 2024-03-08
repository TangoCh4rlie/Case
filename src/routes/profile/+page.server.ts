import prisma from "$lib/prisma";
import { type Case } from "$lib/types/case";
import { remplirDatesManquantesSemainePrecedente } from "$lib/utils/manipulateWeek";
import moment from "moment";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth(); 

    const today = moment();
    const firstJanuary = moment().startOf('year');
    const lastMonday = moment().startOf('isoWeek');
    
    const data = await prisma.user.findUnique({
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
                        gte: firstJanuary.toDate(),
                        lte: today.toDate()
                    }
                }
            }
        }
    })   

    if (!data) {
        return { data: null };
    } else {
        const user = {id: data.id ,name: data.name, img: data.image};
        const cases: Case[] = data.cases;
        
        let week: Case[] = cases.filter(data => data.date >= lastMonday.toDate() && data.date <= today.toDate());
        week = remplirDatesManquantesSemainePrecedente(week, moment().toDate());

        return { user, cases, week };
    }
};