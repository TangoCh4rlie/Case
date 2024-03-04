import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { remplirDatesManquantesSemainePrecedente } from '$lib/utils/manipulateWeek';
import { json } from '@sveltejs/kit';
import moment from 'moment';

export async function GET({ params }) {
    const date = moment(params.date);
    
    const monday = moment(date);
    const sunday = moment(date);
    
    if (monday.day() === 0) {
        monday.day(-6).hour(0).minute(0).second(0);
        sunday.day(0).hour(23).minute(59).second(59);
    } else {
        monday.day(1).hour(0).minute(0).second(0);
        sunday.day(7).hour(23).minute(59).second(59);
    }

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
                        gte: monday.toDate(),
                        lte: sunday.toDate()
                    }
                }
            }
        },
    });

    if (!data) {
        return json({cases: remplirDatesManquantesSemainePrecedente([], monday.toDate())});
    } else {
        const casesWeek: Case[] = remplirDatesManquantesSemainePrecedente(data?.cases, monday.toDate());
        return json({cases: casesWeek});
    }
}
