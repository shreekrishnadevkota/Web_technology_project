import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
dotenv.config();

import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);


// Connect MongoDB
connectDB();


// Server port
const PORT = process.env.PORT || 5000;


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});