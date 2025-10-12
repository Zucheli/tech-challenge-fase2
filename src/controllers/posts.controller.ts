import { Request, Response, NextFunction } from "express";
import * as service from "../services/posts.service";

export const listPublicPosts = async (req: Request, res: Response) => {
    try {
        const posts = await service.listPublicPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar posts públicos" });
    }
};

export const listAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await service.listAllPosts();
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
        const { title, content, author } = req.body;
        const created = await service.createPost({ title, content, author });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { title, content, author } = req.body;
        const updated = await service.updatePost(id, { title, content, author });
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
        const query = req.query.query as string;

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Parâmetro 'query' é obrigatório." });
        }

        const results = await service.searchPosts(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
};
