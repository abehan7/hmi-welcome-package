import express from "express";
import { getView, verifyWallet } from "../controllers/verify-wallet-owner";
import discordAuth from "../middleware/discordAuth";
const router = express.Router();

router.get("/", getView);
router.post("/api/v1", discordAuth, verifyWallet);

export default router;
