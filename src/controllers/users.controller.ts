import { Request, Response } from "express";
import * as service from "../services/users.service";
import { Role } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    const user = await service.createUser({ username, password, role });
    res.status(201).json(user);
};

export const list = async (req: Request, res: Response) => {
    const role = req.query.role as Role | undefined;
    const users = await service.listUsers(role);
    res.json(users);
};

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await service.updateUser(id, req.body);
    res.json(user);
};

export const remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await service.deleteUser(id);
    res.status(204).send();
};
