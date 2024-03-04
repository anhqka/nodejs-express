import { Router } from "express";
import { AUTHEN_ROUTE } from "../constants.js";
import * as authenController from "../controllers/authenController.js";

const router = Router();

// router.get("/", authenController.getauthens);

// router.get("/:id", authenController.getUser);

router.post(AUTHEN_ROUTE.SIGN_IN, authenController.signIn);

export default router;