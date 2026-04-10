import prisma from "../prisma/client";

export const listCommentsByPost = async (postId: number) => {
    return prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: { id: true, username: true, role: true },
            },
        },
    });
};

export const createComment = async (data: {
    content: string;
    userId: number;
    postId: number;
}) => {
    return prisma.comment.create({
        data,
        include: {
            user: {
                select: { id: true, username: true, role: true },
            },
        },
    });
};

export const deleteComment = async (id: number, userId: number) => {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) return null;
    if (comment.userId !== userId) return "forbidden";

    await prisma.comment.delete({ where: { id } });
    return true;
};
