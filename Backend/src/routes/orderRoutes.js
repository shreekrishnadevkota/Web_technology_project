import express from "express";

import {
  placeOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import sellerMiddleware from "../middleware/sellerMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Buyer: checkout the cart / view my order history
router.post("/", placeOrder);
router.get("/mine", getMyOrders);

// Seller: view & update orders containing their products
router.get("/seller", sellerMiddleware, getSellerOrders);
router.put("/:id/status", sellerMiddleware, updateOrderStatus);

export default router;
