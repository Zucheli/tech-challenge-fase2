import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import * as postsController from "../controllers/posts.controller";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts com likes, favoritos e contagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", postsController.listAllPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts com filtros
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Busca parcial em título e conteúdo
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Busca parcial por disciplina
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtro exato por tipo
 *       - in: query
 *         name: liked
 *         schema:
 *           type: boolean
 *         description: Somente posts curtidos pelo usuário logado
 *       - in: query
 *         name: favorited
 *         schema:
 *           type: boolean
 *         description: Somente posts favoritados pelo usuário logado
 *     responses:
 *       200:
 *         description: Lista de posts filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get(
    "/search",
    authMiddleware,
    authorizeRole([Role.ALUNO, Role.PROFESSOR]),
    postsController.searchPosts
);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna detalhes de um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do post com likes, favoritos e contagens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", postsController.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post (somente PROFESSOR)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               type:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *         description: Sem permissão
 */
router.post(
    "/",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.createPost
);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post (somente PROFESSOR)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               type:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado
 *       404:
 *         description: Post não encontrado
 */
router.put(
    "/:id",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.updatePost
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post (somente PROFESSOR)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post removido
 *       404:
 *         description: Post não encontrado
 */
router.delete(
    "/:id",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.deletePost
);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Toggle like em um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado do like após a operação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 */
router.post("/:id/like", authMiddleware, postsController.likePost);

/**
 * @swagger
 * /posts/{id}/favorite:
 *   post:
 *     summary: Toggle favorito em um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado do favorito após a operação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorited:
 *                   type: boolean
 */
router.post("/:id/favorite", authMiddleware, postsController.favoritePost);

export default router;
