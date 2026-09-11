import express from "express";

import {
  register,
  login,
  logout,
  getMe,
  switchRole,
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


// Switch buyer / seller
router.put(
  "/switch-role",
  authMiddleware,
  switchRole
);


export default router;