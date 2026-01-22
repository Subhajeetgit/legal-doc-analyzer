import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: String,
    fileId: mongoose.Schema.Types.ObjectId,
    contentType: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

export default mongoose.model("Document", documentSchema);
