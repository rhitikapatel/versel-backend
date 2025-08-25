import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyRoute from "./routes/company.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (only once per cold start)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// Routes
app.use("/api/company", CompanyRoute);
app.use("/api/user", userRoute);

// Root test route
app.get("/api", (req, res) => {
  res.json({ message: "Backend running on Vercel 🚀" });
});

// ✅ Export the app for Vercel
export default app;
