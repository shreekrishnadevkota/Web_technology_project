import express from "express";

import {
  createCustomOrder,
  getMyCustomOrders,
  getSellerCustomOrders,
  quoteCustomOrder,
  respondToQuote,
  updateCustomOrderStatus,
} from "../controllers/customOrderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import sellerMiddleware from "../middleware/sellerMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Customer — "referenceImage" is an optional multipart file field
router.post("/", upload.single("referenceImage"), createCustomOrder);
router.get("/mine", getMyCustomOrders);
router.put("/:id/respond", respondToQuote);

// Seller
router.get("/seller", sellerMiddleware, getSellerCustomOrders);
router.put("/:id/quote", sellerMiddleware, quoteCustomOrder);
router.put("/:id/status", sellerMiddleware, updateCustomOrderStatus);

export default router;
