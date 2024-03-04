import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { remplirDatesManquantesSemainePrecedente } from '$lib/utils/manipulateWeek';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const date: Date = new Date(params.date);

    console.log("dateclické", date);
    
    const monday = new Date(date);
    monday.setDate(date.getDate() - date.getDay() + 2);
    monday.setHours(-23, 0, 0, 0);

    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay() + 8)
    sunday.setHours(0, 59, 59, 999);
    

    console.log("monday", monday);
    console.log("sunday", sunday);
    

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

    if (!data) {
        return json({cases: remplirDatesManquantesSemainePrecedente([], monday)});
    } else {
        const casesWeek: Case[] = remplirDatesManquantesSemainePrecedente(data?.cases, monday);
        return json({cases: casesWeek});
    }
}
