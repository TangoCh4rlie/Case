import prisma from "$lib/prisma";
import { type Case } from "$lib/types/case";
import { remplirDatesManquantesSemainePrecedente } from "$lib/utils/manipulateWeek";
import moment from "moment";
import type { PageServerLoad } from "./$types";

export const prerender = 'auto';

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth(); 

    const today = moment();
    const firstJanuary = moment().startOf('year');
    const lastMonday = moment().startOf('isoWeek');
    
    const data = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string,
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
        // Récupération des données de l'utilisateur
        const user = {id: data.id ,name: data.name, img: data.image};
        // Récupération de toutes les cases de l'utilisateur sur l'année actuelle
        const cases: Case[] = data.cases;
        
        // Récupération des données de la semaine actuelle
        let week: Case[] = cases.filter(data => data.date >= lastMonday.toDate() && data.date <= today.toDate());
        week = remplirDatesManquantesSemainePrecedente(week, moment().toDate());

        return { user, cases, week };
    }
};