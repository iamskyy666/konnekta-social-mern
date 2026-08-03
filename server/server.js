import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/connectDb.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (_, res) => {
  res.json({ message: "✅ Konnekta - Server is running!", status: 200 });
});

// inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`🟢 MongoDB Connected`);
      console.log(`🔵 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("🔴 Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

start();

//06.30.10
