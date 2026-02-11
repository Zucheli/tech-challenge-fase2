import { Router } from "express";
import { generateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Professor
    if (username === "mateus" && password === "1234") {
        const token = generateToken({
            username,
            role: "PROFESSOR",
        });

        return res.json({
            token,
            role: "PROFESSOR",
        });
    }

    // Aluno
    if (username === "aluno" && password === "1234") {
        const token = generateToken({
            username,
            role: "ALUNO",
        });

        return res.json({
            token,
            role: "ALUNO",
        });
    }

    res.status(401).json({ error: "Credenciais inválidas" });
});

export default router;
