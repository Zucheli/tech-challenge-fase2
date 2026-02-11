import request from "supertest";
import app from "../src/app";
import { generateToken } from "../src/middlewares/auth.middleware";

const professorToken = generateToken({
    username: "mateus",
    role: "PROFESSOR"
});

const alunoToken = generateToken({
    username: "joao",
    role: "ALUNO"
});

describe("POSTS API", () => {
    it("deve criar um novo post (professor)", async () => {
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({
                title: "Post de Teste",
                content: "Conteúdo gerado automaticamente"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    it("aluno não pode criar post", async () => {
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({
                title: "Post proibido",
                content: "teste"
            });

        expect(res.statusCode).toBe(403);
    });

    it("deve listar posts publicamente", async () => {
        const res = await request(app).get("/posts");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("deve listar todos os posts (professor)", async () => {
        const res = await request(app)
            .get("/posts/all")
            .set("Authorization", `Bearer ${professorToken}`);

        expect(res.statusCode).toBe(200);
    });

    it("deve retornar 404 ao buscar post inexistente", async () => {
        const res = await request(app).get("/posts/9999");
        expect(res.statusCode).toBe(404);
    });

    it("deve atualizar post (professor)", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({
                title: "Original",
                content: "Texto"
            });

        const update = await request(app)
            .put(`/posts/${novo.body.id}`)
            .set("Authorization", `Bearer ${professorToken}`)
            .send({
                title: "Atualizado"
            });

        expect(update.statusCode).toBe(200);
        expect(update.body.title).toBe("Atualizado");
    });
});
