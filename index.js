import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyRoute from "./routes/company.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import "dotenv/config.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://versel-frontend-two.vercel.app" // deployed frontend (removed extra "h" + trailing slash)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB connection (once per cold start)
if (mongoose.connection.readyState === 0) {
  console.log("Checking MongoDB URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// ✅ Routes
app.use("/api/company", CompanyRoute);
app.use("/api/user", userRoute);

// ✅ Root test route
app.get("/api", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

// ✅ Export app for Vercel
export default app;
