import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/connectDb.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ message: "✅ Konnekta - Server is running!", status: 200 });
});

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
