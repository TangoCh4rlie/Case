import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const body = await request.json();
    const name: string = body.name;
    const email: string = body.email;

    console.log(name, email);
    

    try {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                name
            }
        })
        console.log('Success');
        
    } catch (error) {
        console.log(error);
        
    }

    return json({ status: 200, message: 'Success' });
} 