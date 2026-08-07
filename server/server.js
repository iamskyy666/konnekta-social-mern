import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/connectDb.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import storyRouter from "./routes/storyRoutes.js";

const app = express();

// REFACTORED: Connect to MongoDB as soon as the app initializes.
// Our connectDB() should ideally cache the connection so repeated
// serverless invocations don't create new connections.
await connectDB(process.env.MONGO_URI);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Health Check
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "✅ Konnekta - Server is running!",
  });
});

// Inngest
app.use("/api/v1/inngest", serve({ client: inngest, functions }));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/story", storyRouter);

// REFACTORED: Only start an HTTP server when running locally.
// Vercel automatically provides the HTTP server.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log("🟢 MongoDB Connected");
    console.log(`🔵 Server running on port: ${PORT}`);
  });
}

// REFACTORED: Export the Express app for Vercel Serverless Functions.
export default app;

// 09.03.00 🕛
