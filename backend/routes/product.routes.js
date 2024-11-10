import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.midddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
  getOrderProducts,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", protectRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/orders", getOrderProducts);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
