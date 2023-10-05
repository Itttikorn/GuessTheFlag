import express from "express";

import * as leaderController from "../controllers/leaderController.js";

const router = express.Router();

router.get("/", leaderController.getboard);
router.post("/", leaderController.createItem);
router.put("/:id", leaderController.editItem);

export default router;
