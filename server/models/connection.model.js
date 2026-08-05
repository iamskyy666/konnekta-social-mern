import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    from_user_id: { type: String, ref: "User", required: true },
    to_user_id: { type: String, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  },
  { timestamps: true },
);

// Prevent duplicate connection documents at the database level
connectionSchema.index(
  {
    from_user_id: 1,
    to_user_id: 1,
  },
  { unique: true },
);

const ConnectionModel = mongoose.model("Connection", connectionSchema);
export default ConnectionModel;
