import request from "supertest";
import app from "../src/app";
import { generateToken } from "../src/middlewares/auth.middleware";
import prisma from "../src/prisma/client";

let professorToken: string;
let alunoToken: string;

describe("COMMENTS API", () => {
    let postId: number;
    let commentId: number;

    beforeAll(async () => {
        const professor = await prisma.user.upsert({
            where: { username: "mateus_comment_test" },
            update: {},
            create: { username: "mateus_comment_test", password: "1234", role: "PROFESSOR" },
        });
        const aluno = await prisma.user.upsert({
            where: { username: "joao_comment_test" },
            update: {},
            create: { username: "joao_comment_test", password: "1234", role: "ALUNO" },
        });

        professorToken = generateToken({ id: professor.id, username: professor.username, role: professor.role });
        alunoToken = generateToken({ id: aluno.id, username: aluno.username, role: aluno.role });

        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ title: "Post para comentar", content: "Conteúdo" });

        postId = res.body.id;
    });

    it("deve criar um comentário (aluno)", async () => {
        const res = await request(app)
            .post(`/posts/${postId}/comments`)
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ content: "Ótimo post!" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.content).toBe("Ótimo post!");
        expect(res.body.user).toHaveProperty("username");

        commentId = res.body.id;
    });

    it("deve listar comentários de um post", async () => {
        const res = await request(app).get(`/posts/${postId}/comments`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("deve retornar 400 ao criar comentário com conteúdo vazio", async () => {
        const res = await request(app)
            .post(`/posts/${postId}/comments`)
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ content: "" });

        expect(res.statusCode).toBe(400);
    });

    it("deve retornar 401 ao comentar sem autenticação", async () => {
        const res = await request(app)
            .post(`/posts/${postId}/comments`)
            .send({ content: "Sem token" });

        expect(res.statusCode).toBe(401);
    });

    it("deve deletar o próprio comentário", async () => {
        const res = await request(app)
            .delete(`/posts/${postId}/comments/${commentId}`)
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(204);
    });

    it("deve retornar 403 ao tentar deletar comentário de outro usuário", async () => {
        const novo = await request(app)
            .post(`/posts/${postId}/comments`)
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ content: "Comentário protegido" });

        const res = await request(app)
            .delete(`/posts/${postId}/comments/${novo.body.id}`)
            .set("Authorization", `Bearer ${professorToken}`);

        expect(res.statusCode).toBe(403);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
