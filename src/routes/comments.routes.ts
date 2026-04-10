import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as commentsController from "../controllers/comments.controller";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comentários em posts
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Lista comentários de um post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", commentsController.listComments);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Adiciona um comentário a um post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Ótimo post, muito útil!
 *     responses:
 *       201:
 *         description: Comentário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.post("/", authMiddleware, commentsController.createComment);

/**
 * @swagger
 * /posts/{postId}/comments/{id}:
 *   delete:
 *     summary: Remove um comentário (somente o autor)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comentário removido
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Comentário não encontrado
 */
router.delete("/:id", authMiddleware, commentsController.deleteComment);

export default router;
