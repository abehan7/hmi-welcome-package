import express from "express";
import { verifyToken, verifyWallet } from "../controllers/verify-wallet-owner";
import discordAuth from "../middleware/discordAuth";
const router = express.Router();

// 이렇게 2개는 post로 인증한 사람들만 가능
// router.get("/wallet", verifyWallet);
// router.get("/token", verifyWallet);
// router.get("/", getView);
router.post("/wallet", discordAuth, verifyWallet);
// 여기는 지갑 인증한 사람들만 가능하게 해야함
router.post("/token", verifyToken);

export default router;
