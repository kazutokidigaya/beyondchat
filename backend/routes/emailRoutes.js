import express from "express";
import { sendIntegrationEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/send-integration-email", sendIntegrationEmail);

export default router;
