import express from "express";

import {
  register,
  login,
  logout,
  getMe,
  switchRole,
  becomeSeller,
  updateSellerProfile,
  updateProfile,
  getCustomPrintSellers,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Logout
router.post("/logout", logout);


// Get current user
router.get("/me", authMiddleware, getMe);

// edit profile
router.put("/profile", authMiddleware, updateProfile);


// Switch buyer / seller (one-click toggle)
router.put(
  "/switch-role",
  authMiddleware,
  switchRole
);

// One-time seller registration (also switches role to seller)
router.post("/become-seller", authMiddleware, becomeSeller);

// Update seller settings (shop name, bio, custom print toggle)
router.put("/seller-profile", authMiddleware, updateSellerProfile);

// Public: sellers currently accepting custom print requests
router.get("/custom-print-sellers", getCustomPrintSellers);


export default router;
