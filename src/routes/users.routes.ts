import { Router } from "express";
import * as controller from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.use(authMiddleware);
router.use(authorizeRole([Role.PROFESSOR]));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários (somente PROFESSOR)
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário (somente PROFESSOR)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: joao
 *               password:
 *                 type: string
 *                 example: "1234"
 *               role:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR]
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Sem permissão
 */
router.post("/", controller.create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista usuários (somente PROFESSOR)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ALUNO, PROFESSOR]
 *         description: Filtrar por role
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", controller.list);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário (somente PROFESSOR)
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR]
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário (somente PROFESSOR)
 *     tags: [Users]
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
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", controller.remove);

export default router;
