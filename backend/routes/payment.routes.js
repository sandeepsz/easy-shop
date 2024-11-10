import express from "express";
import { protectRoute } from "../middleware/auth.midddleware.js";
import { payment, order } from "../controller/payment.controller.js";
const router = express.Router();

router.post("/khalti", protectRoute, payment);
router.post("/order", protectRoute, order);

export default router;
