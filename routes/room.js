import { Router } from "express";
import { ROOMS_ROUTE } from "../constants.js";
import * as roomsController from "../controllers/roomsController.js";

const router = Router();

router.get("/", roomsController.getRooms);

router.get("/:id", roomsController.getRoom);

router.post(ROOMS_ROUTE.NEW, roomsController.roomNew);

export default router;