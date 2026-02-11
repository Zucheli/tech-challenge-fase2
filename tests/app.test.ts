import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma/client";

describe("Health Check", () => {
    it("deve responder com status 200", async () => {
        const res = await request(app).get("/health");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});
