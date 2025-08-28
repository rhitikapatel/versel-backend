import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import CompanyRoute from "./routes/company.route.js";
import userRoute from "./routes/user.route.js";

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://versel-frontend-two.vercel.app" // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB connection (runs once per cold start in Vercel serverless)
if (mongoose.connection.readyState === 0) {
  console.log(
    "Checking MongoDB URI:",
    process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌"
  );

  mongoose
    .connect(process.env.MONGODB_URI) // removed deprecated options
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// ✅ Routes
app.use("/api/company", CompanyRoute);
app.use("/api/user", userRoute);

// ✅ Root test routes
app.get("/", (req, res) => {
  res.send("Backend root is live 🚀. Use /api for routes.");
});

app.get("/api", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

// ✅ Export app (Vercel will use this)
export default app;
