import express from "express";
import { protectRoute } from "../middleware/auth.midddleware.js";
import {
  addToCart,
  getCartProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.delete("/:id", protectRoute, updateQuantity);

export default router;
