import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.routes";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";

const app = express();

setupSwagger(app);

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use(errorHandler);
app.use("/posts", postsRouter);

// rota de teste
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

export default app;
