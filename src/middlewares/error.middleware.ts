import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Erro:", err);
    res.status(500).json({ error: "Erro interno do servidor", details: err.message || err });
};
