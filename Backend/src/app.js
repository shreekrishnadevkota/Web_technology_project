import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();


// MIDDLEWARE

// Allow frontend to access backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Read JSON data
app.use(express.json());

// Read cookies
app.use(cookieParser());


// ROUTES

app.use("/api/auth", authRoutes);


// TEST ROUTE

app.get("/", (req, res) => {
  res.json({
    message: "3D Printing Platform API is running",
  });
});


export default app;