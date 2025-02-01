import express from "express";
import { scrapeAndSave } from "../controllers/scrapeControllers.js";

const router = express.Router();

router.post("/", scrapeAndSave);

export default router;
