import express from "express";
const router = express.Router();

import { createOG, createWhiteList } from "../controllers/user";
import auth from "../middleware/auth";

// router.get("/", auth, getWhiteList);
router.patch("/:discord_id/whitelist", auth, createWhiteList);
router.patch("/:discord_id/og", auth, createOG);

export default router;
