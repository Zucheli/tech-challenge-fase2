import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as postsController from "../controllers/posts.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para gerenciamento de posts
 */

/**
 * @swagger
 * /posts/public:
 *   get:
 *     summary: Lista posts públicos disponíveis aos alunos
 *     tags: [Posts]
 *     description: Retorna apenas posts marcados como públicos. Não requer autenticação.
 *     responses:
 *       200:
 *         description: Lista de posts públicos retornada com sucesso
 */
router.get("/public", postsController.listPublicPosts);

/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Lista todos os posts criados (visível para professores)
 *     tags: [Posts]
 *     description: Retorna todos os posts criados, incluindo privados e públicos. Requer autenticação.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os posts retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
router.get("/all", authMiddleware, postsController.listAllPosts);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get("/", authMiddleware, postsController.listPublicPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Palavra a ser buscada no título ou conteúdo
 *     responses:
 *       200:
 *         description: Lista de posts correspondentes
 *       400:
 *         description: Parâmetro de busca ausente
 */
router.get("/search", authMiddleware, postsController.searchPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post pelo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", postsController.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
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
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 */
router.post("/", authMiddleware, postsController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
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
 *       required: true
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
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put("/:id", authMiddleware, postsController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um post
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
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete("/:id", authMiddleware, postsController.deletePost);


export default router;
