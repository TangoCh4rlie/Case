import prisma from '$lib/prisma.js';
import type { Case } from '$lib/types/case';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const body = await request.json();
    const data: Case[] = body.cases;
    
    // await prisma.case.upsert({
    //     where: {
    //         userId: data[0].userId,
    //     }
    // })
    
    return json({ data });
}