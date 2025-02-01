import express from "express";
import { testChatbot, trainChatbot } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/train", trainChatbot);
router.post("/test", testChatbot);

export default router;
