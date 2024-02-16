import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    const response = await prisma.user.findMany({
        where: { username: "JohnDoe" },
        include: { cases: true },
    })
    return { user: response };
}) satisfies PageServerLoad;