import prisma from "../prisma/client";

export const listAllPosts = async (userId?: number) => {
    return prisma.post.findMany({
        orderBy: { createdAt: "desc" },

        include: {
            _count: {
                select: {
                    likes: true,
                    favorites: true,
                },
            },
            likes: userId
                ? {
                    where: { userId },
                    select: { id: true },
                }
                : false,
            favorites: userId
                ? {
                    where: { userId },
                    select: { id: true },
                }
                : false,
        },
    });
};

export const getPostById = async (id: number) => {
    return prisma.post.findUnique({ where: { id } });
};

export const createPost = async (data: { title: string; content: string; author?: string, type?: string, subject?: string }) => {
    return prisma.post.create({ data });
};

export const updatePost = async (id: number, data: { title?: string; content?: string; author?: string, type?: string, subject?: string }) => {
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

export const searchPosts = async ({
    query,
    subject,
    type,
}: {
    query?: string;
    subject?: string;
    type?: string;
}) => {
    const filters: any[] = [];

    // 🔍 busca geral (title + content)
    if (query?.trim()) {
        filters.push({
            OR: [
                {
                    title: {
                        contains: query.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: query.trim(),
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    // 📚 disciplina (agora parcial também)
    if (subject?.trim()) {
        filters.push({
            subject: {
                contains: subject.trim(),
                mode: "insensitive",
            },
        });
    }

    // 🏷️ tipo (mantém exato, porque vem do select)
    if (type?.trim()) {
        filters.push({
            type: type.trim(),
        });
    }

    return prisma.post.findMany({
        where: filters.length ? { AND: filters } : {},
        orderBy: { createdAt: "desc" },
    });
};

export const toggleLike = async (userId: number, postId: number) => {
    const existing = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: userId,
                postId: postId,
            },
        },
    });

    if (existing) {
        await prisma.like.delete({
            where: { id: existing.id },
        });

        return { liked: false };
    }

    await prisma.like.create({
        data: {
            userId,
            postId,
        },
    });

    return { liked: true };
};

export const toggleFavorite = async (userId: number, postId: number) => {
    const existing = await prisma.favorite.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    });

    if (existing) {
        await prisma.favorite.delete({
            where: {
                userId_postId: { userId, postId }
            }
        });
        return { favorited: false };
    }

    await prisma.favorite.create({
        data: { userId, postId }
    });

    return { favorited: true };
};