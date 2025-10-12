import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret123";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
        jwt.verify(token, SECRET);
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido" });
    }
};

// função auxiliar pra gerar tokens (pode usar num endpoint de login fake)
export const generateToken = (payload: object) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};
