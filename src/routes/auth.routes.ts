import { Router } from "express";
import { generateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // autenticação fake apenas pra testes
    if (username === "mateus" && password === "1234") {
        const token = generateToken({ username });
        return res.json({ token });
    }

    res.status(401).json({ error: "Credenciais inválidas" });
});

export default router;
