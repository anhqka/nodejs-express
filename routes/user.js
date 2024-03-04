import { Router } from "express";
import { USERS_ROUTE } from "../constants.js";
import * as userController from "../controllers/usersController.js";

const router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post(USERS_ROUTE.NEW, userController.userNew);

export default router;