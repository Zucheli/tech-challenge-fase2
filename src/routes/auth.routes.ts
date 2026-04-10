import { Router } from "express";
import { generateToken } from "../middlewares/auth.middleware";
import prisma from "../prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna o token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: mateus
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [PROFESSOR, ALUNO]
 *       401:
 *         description: Credenciais inválidas
 */
const CREDENTIALS: Record<string, { password: string; role: "PROFESSOR" | "ALUNO" }> = {
    mateus: { password: "1234", role: "PROFESSOR" },
    aluno: { password: "1234", role: "ALUNO" },
};

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const cred = CREDENTIALS[username];

    if (!cred || cred.password !== password) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username, password, role: cred.role },
    });

    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
    });

    return res.json({ token, role: user.role });
});

export default router;
