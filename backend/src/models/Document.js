import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    contentType: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
    },

    analysis: {
      summary: {
        type: String,
      },
      clauses: {
        type: [String],
        default: [],
      },
      risks: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Document", documentSchema);
