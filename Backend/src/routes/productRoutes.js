import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import sellerMiddleware from "../middleware/sellerMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public: browse / search / filter catalog
router.get("/", getProducts);

// Seller only: list of my own products (must come before "/:id")
router.get("/mine", authMiddleware, sellerMiddleware, getMyProducts);

// Public: single product details
router.get("/:id", getProductById);

// Seller only: create / edit / remove listings (FR-06)
// "image" is an optional multipart file field, uploaded to ImageKit.
router.post(
  "/",
  authMiddleware,
  sellerMiddleware,
  upload.single("image"),
  createProduct
);
router.put(
  "/:id",
  authMiddleware,
  sellerMiddleware,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", authMiddleware, sellerMiddleware, deleteProduct);

export default router;
