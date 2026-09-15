import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import customOrderRoutes from "./routes/customOrderRoutes.js";

const app = express();


// MIDDLEWARE

// Allow frontend to access backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Read JSON data (raised limit so a base64 product image fits in the body)
app.use(express.json({ limit: "10mb" }));

// Read cookies
app.use(cookieParser());


// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/custom-orders", customOrderRoutes);


// TEST ROUTE

app.get("/", (req, res) => {
  res.json({
    message: "3D Printing Platform API is running",
  });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler (catches anything thrown/next(err))
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});


export default app;
