import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data: {
    username: string;
    password: string;
    role: Role;
}) => {
    return prisma.user.create({ data });
};

export const listUsers = async (role?: Role) => {
    return prisma.user.findMany({
        where: role ? { role } : undefined,
        select: {
            id: true,
            username: true,
            role: true,
            createdAt: true,
        },
    });
};

export const updateUser = async (
    id: number,
    data: Partial<{ username: string; password: string; role: Role }>
) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};
