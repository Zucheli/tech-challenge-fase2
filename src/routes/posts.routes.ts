import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import * as postsController from "../controllers/posts.controller";
import { Role } from "@prisma/client";

const router = Router();

/**
 * POSTS PÚBLICOS (sem login)
 */
router.get("/public", postsController.listPublicPosts);

/**
 * LISTAR TODOS OS POSTS (somente PROFESSOR)
 */
router.get(
    "/all",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.listAllPosts
);

/**
 * LISTAR POSTS (ALUNO e PROFESSOR)
 */
router.get(
    "/",
    postsController.listPublicPosts
);

/**
 * BUSCAR POSTS (ALUNO e PROFESSOR)
 */
router.get(
    "/search",
    authMiddleware,
    authorizeRole([Role.ALUNO, Role.PROFESSOR]),
    postsController.searchPosts
);

/**
 * DETALHES DO POST (ALUNO e PROFESSOR)
 */
router.get(
    "/:id",
    postsController.getPostById
);

/**
 * CRIAR POST (somente PROFESSOR)
 */
router.post(
    "/",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.createPost
);

/**
 * ATUALIZAR POST (somente PROFESSOR)
 */
router.put(
    "/:id",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.updatePost
);

/**
 * DELETAR POST (somente PROFESSOR)
 */
router.delete(
    "/:id",
    authMiddleware,
    authorizeRole([Role.PROFESSOR]),
    postsController.deletePost
);

export default router;
