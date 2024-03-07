import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } from '$env/static/private';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '$lib/prisma';

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async redirect() {
            return '/profile'
        }
      }
})