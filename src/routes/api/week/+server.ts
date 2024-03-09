import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const body = await request.json();
    const cases: Case[] = body.cases;
    const userId: string = body.userId;

    try {
        await Promise.all(
            cases.map(async (c) => {
                prisma.$transaction(async (prisma) => {
                    await prisma.case.upsert({
                        where: {
                            id: c.id,
                            userId: userId
                        },
                        update: {
                            description: c.description,
                            color: c.color,
                        },
                        create: {
                            date: c.date,
                            description: c.description,
                            color: c.color,
                            place: c.place,
                            photo: c.photo,
                            people: c.people,
                            tag: c.tag,
                            userId: userId,
                        },
                    })
                })
            })
        );
        return json({ status: 200, message: 'Success' });
    } catch (error) {
        return json({ status: 500, message: 'Error when updating cases' });
    }
}