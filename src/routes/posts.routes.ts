import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import * as postsController from "../controllers/posts.controller";
import { Role } from "@prisma/client";

const router = Router();

/**
 * LISTAR POSTS (ALUNO e PROFESSOR)
 */
router.get(
    "/",
    postsController.listAllPosts
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

router.post("/:id/like", authMiddleware, postsController.likePost);
router.post("/:id/favorite", authMiddleware, postsController.favoritePost);

export default router;
