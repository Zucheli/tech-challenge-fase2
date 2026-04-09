import { Request, Response, NextFunction } from "express";
import * as service from "../services/posts.service";

export const listAllPosts = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id;

        const posts = await service.listAllPosts(userId);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar todos os posts" });
    }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const post = await service.getPostById(id);

        if (!post) {
            return res.status(404).json({ error: "Post não encontrado" });
        }

        res.json(post);
    } catch (err) {
        next(err);
    }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, author, type, subject } = req.body;
        const created = await service.createPost({ title, content, author, type, subject });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { title, content, author, type, subject } = req.body;
        const updated = await service.updatePost(id, { title, content, author, type, subject });
        if (!updated) return res.status(404).json({ error: "Post not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const deleted = await service.deletePost(id);
        if (!deleted) return res.status(404).json({ error: "Post not found" });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const searchPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, subject, type } = req.query;

        const results = await service.searchPosts({
            query: query as string,
            subject: subject as string,
            type: type as string,
        });

        res.json(results);
    } catch (err) {
        next(err);
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?.id;
        const postId = Number(req.params.id);

        console.log("REQ.USER:", req.user);

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const result = await service.toggleLike(userId, postId);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao dar like" });
    }
};

export const favoritePost = async (req: Request, res: Response,) => {
    const userId = (req.user as any).id;
    const postId = Number(req.params.id);

    const result = await service.toggleFavorite(userId, postId);
    res.json(result);
};
