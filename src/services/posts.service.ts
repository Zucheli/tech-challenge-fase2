import prisma from "../prisma/client";

export const listPublicPosts = async () => {
    return prisma.post.findMany({
        where: { isPublic: true },
    });
};

export const listAllPosts = async () => {
    return prisma.post.findMany();
};

export const getPostById = async (id: number) => {
    return prisma.post.findUnique({ where: { id } });
};

export const createPost = async (data: { title: string; content: string; author?: string }) => {
    return prisma.post.create({ data });
};

export const updatePost = async (id: number, data: { title?: string; content?: string; author?: string }) => {
    try {
        return await prisma.post.update({ where: { id }, data });
    } catch (error: any) {
        if (error.code === "P2025") {
            return null;
        }
        throw error;
    }
};

export const deletePost = async (id: number) => {
    try {
        await prisma.post.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
};

export const searchPosts = async (query: string) => {
    return prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
            ],
        },
        orderBy: { createdAt: "desc" },
    });
};
