import express from "express";
import { protectRoute } from "../middleware/auth.midddleware.js";
import { paymentController } from "../controller/payment.controller.js";
const router = express.Router();

router.post("/khalti", protectRoute, paymentController);

export default router;
