import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import Document from "../models/Document.js";
import {extractText} from "../utils/textextractor.js";
import { analyzeLegalDocument } from "../services/analysisService.js";


export const analyzeDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const downloadStream = bucket.openDownloadStream(document.fileId);
    const chunks = [];

    downloadStream.on("data", (chunk) => chunks.push(chunk));

    downloadStream.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      const text = await extractText(buffer, document.contentType);

      const analysis = await analyzeLegalDocument(text);

      document.extractedText = text;
      document.analysis = analysis;
      await document.save();

      res.json({
        message: "Document analyzed successfully",
        analysis,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analysis failed" });
  }
};
