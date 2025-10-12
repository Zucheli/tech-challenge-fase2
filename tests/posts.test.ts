import request from "supertest";
import app from "../src/app";
import { generateToken } from "../src/middlewares/auth.middleware";

const token = generateToken({ username: "mateus" });

describe("POSTS API", () => {
    it("deve criar um novo post", async () => {
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Post de Teste",
                content: "Conteúdo gerado automaticamente",
                author: "Mateus"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    it("deve listar posts", async () => {
        const res = await request(app)
            .get("/posts")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("deve listar posts públicos sem autenticação", async () => {
        const res = await request(app).get("/posts/public");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("deve listar todos os posts (professor)", async () => {
        const res = await request(app)
            .get("/posts/all")
            .set("Authorization", "Bearer tokenFake");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("deve retornar erro 401 sem token", async () => {
        const res = await request(app).get("/posts");
        expect(res.statusCode).toBe(401);
    });

    it("deve retornar 404 ao buscar um post inexistente", async () => {
        const res = await request(app)
            .get("/posts/9999")
            .set("Authorization", "Bearer tokenFake");

        expect(res.statusCode).toBe(404);
    });

    it("deve atualizar um post existente", async () => {
        const novoPost = await request(app)
            .post("/posts")
            .set("Authorization", "Bearer tokenFake")
            .send({
                title: "Post Original",
                content: "Texto inicial"
            });

        const postId = novoPost.body.id;

        const updateRes = await request(app)
            .put(`/posts/${postId}`)
            .set("Authorization", "Bearer tokenFake")
            .send({
                title: "Post Atualizado",
                content: "Texto alterado"
            });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.title).toBe("Post Atualizado");
    });
});
