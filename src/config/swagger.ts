import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tech Challenge Fase 2 - API",
            version: "1.0.0",
            description:
                "API de posts para professores e alunos do ensino público. Inclui autenticação JWT, CRUD de posts, likes, favoritos e comentários.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Post: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        content: { type: "string" },
                        author: { type: "string", nullable: true },
                        type: { type: "string", nullable: true },
                        subject: { type: "string", nullable: true },
                        isPublic: { type: "boolean" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        _count: {
                            type: "object",
                            properties: {
                                likes: { type: "integer" },
                                favorites: { type: "integer" },
                            },
                        },
                        likes: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: { userId: { type: "integer" } },
                            },
                        },
                        favorites: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: { userId: { type: "integer" } },
                            },
                        },
                    },
                },
                Comment: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        content: { type: "string" },
                        postId: { type: "integer" },
                        userId: { type: "integer" },
                        createdAt: { type: "string", format: "date-time" },
                        user: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                username: { type: "string" },
                                role: { type: "string", enum: ["ALUNO", "PROFESSOR"] },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
