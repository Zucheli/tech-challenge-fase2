import request from "supertest";
import app from "../src/app";
import { generateToken } from "../src/middlewares/auth.middleware";
import prisma from "../src/prisma/client";

let professorToken: string;
let alunoToken: string;

describe("POSTS API", () => {
    beforeAll(async () => {
        const professor = await prisma.user.upsert({
            where: { username: "mateus_test" },
            update: {},
            create: { username: "mateus_test", password: "1234", role: "PROFESSOR" },
        });
        const aluno = await prisma.user.upsert({
            where: { username: "joao_test" },
            update: {},
            create: { username: "joao_test", password: "1234", role: "ALUNO" },
        });

        professorToken = generateToken({ id: professor.id, username: professor.username, role: professor.role });
        alunoToken = generateToken({ id: aluno.id, username: aluno.username, role: aluno.role });
    });
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
            .get("/posts")
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

    it("deve dar like em um post (aluno)", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post para like", content: "Conteúdo" });

        const res = await request(app)
            .post(`/posts/${novo.body.id}/like`)
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("liked");
    });

    it("deve alternar like (toggle) ao dar like duas vezes", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post toggle like", content: "Conteúdo" });

        await request(app)
            .post(`/posts/${novo.body.id}/like`)
            .set("Authorization", `Bearer ${alunoToken}`);

        const res = await request(app)
            .post(`/posts/${novo.body.id}/like`)
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.liked).toBe(false);
    });

    it("deve favoritar um post (aluno)", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post para favoritar", content: "Conteúdo" });

        const res = await request(app)
            .post(`/posts/${novo.body.id}/favorite`)
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("favorited");
    });

    it("deve alternar favorito (toggle) ao favoritar duas vezes", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post toggle favorite", content: "Conteúdo" });

        await request(app)
            .post(`/posts/${novo.body.id}/favorite`)
            .set("Authorization", `Bearer ${alunoToken}`);

        const res = await request(app)
            .post(`/posts/${novo.body.id}/favorite`)
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.favorited).toBe(false);
    });

    it("deve retornar 401 ao tentar dar like sem autenticação", async () => {
        const novo = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post sem auth", content: "Conteúdo" });

        const res = await request(app)
            .post(`/posts/${novo.body.id}/like`);

        expect(res.statusCode).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
