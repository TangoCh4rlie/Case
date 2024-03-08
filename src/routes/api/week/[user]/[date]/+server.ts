import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { remplirDatesManquantesSemainePrecedente } from '$lib/utils/manipulateWeek';
import { json } from '@sveltejs/kit';
import moment from 'moment';

export async function GET({ params }) {
    const date = moment(params.date, "YYYY-M-D");
    const user = params.user;
    
    const monday = moment(date).startOf('isoWeek');
    const sunday = moment(date).endOf('isoWeek');

    const data = await prisma.user.findUnique({
        where: {
            name: user
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
