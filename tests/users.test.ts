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

describe("USERS API", () => {
    it("professor deve criar usuário", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${professorToken}`)
            .send({
                username: "novoUser",
                password: "1234",
                role: "ALUNO"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe("novoUser");
    });

    it("aluno não pode criar usuário", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({
                username: "teste",
                password: "1234",
                role: "ALUNO"
            });

        expect(res.statusCode).toBe(403);
    });

    it("professor deve listar usuários", async () => {
        const res = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${professorToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("aluno não pode acessar usuários", async () => {
        const res = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${alunoToken}`);

        expect(res.statusCode).toBe(403);
    });
});