import { Request, Response, NextFunction } from "express";
import * as service from "../services/comments.service";

export const listComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = Number(req.params.postId);

        if (isNaN(postId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const comments = await service.listCommentsByPost(postId);
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const postId = Number(req.params.postId);
        const { content } = req.body;

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        if (isNaN(postId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        if (!content?.trim()) {
            return res.status(400).json({ error: "Conteúdo do comentário é obrigatório" });
        }

        const comment = await service.createComment({ content, userId, postId });
        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const id = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const result = await service.deleteComment(id, userId);

        if (result === null) {
            return res.status(404).json({ error: "Comentário não encontrado" });
        }

        if (result === "forbidden") {
            return res.status(403).json({ error: "Sem permissão para deletar esse comentário" });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
