import { Router } from "express";
import * as controller from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.use(authMiddleware);
router.use(authorizeRole([Role.PROFESSOR]));

router.post("/", controller.create);
router.get("/", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
