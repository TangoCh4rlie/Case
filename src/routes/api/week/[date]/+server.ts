import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { remplirDatesManquantesSemaine } from '$lib/utils/manipulateWeek';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const date: Date = new Date(params.date);
    
    const monday = new Date(date); monday.setDate(date.getDate() - date.getDay() + 2);
    const sunday = new Date(date); sunday.setDate(date.getDate() - date.getDay() + 8);

    const data = await prisma.user.findUnique({
        where: {
            username: 'JohnDoe'
        },
        select: {
            cases: {
                orderBy: {
                    date: 'asc'
                },
                where: {

                    date: {
                        gte: monday,
                        lte: sunday
                    }
                }
            }
        },
    });

    // console.log(data?.cases);
    

    if (!data) {
        return json({cases: remplirDatesManquantesSemaine([])});
    } else {
        const casesWeek: Case[] = remplirDatesManquantesSemaine(data?.cases);
        return json({cases: casesWeek});
    }
}
