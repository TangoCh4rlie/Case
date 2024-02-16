import prisma from "$lib/prisma";

export const getUser = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username: username },
        select: { cases: true }
    });
}