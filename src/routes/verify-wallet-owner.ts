import express from "express";
import { getView, verifyWallet } from "../controllers/verify-wallet-owner";
const router = express.Router();

router.get("/", getView);
router.post("/api/v1", verifyWallet);

export default router;
