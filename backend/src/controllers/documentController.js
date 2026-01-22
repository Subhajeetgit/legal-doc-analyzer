import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const uploadStream = bucket.openUploadStream(
      `${Date.now()}-${req.file.originalname}`,
      {
        contentType: req.file.mimetype,
      }
    );

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const doc = await Document.create({
        user: req.user._id,
        filename: uploadStream.filename,
        fileId: uploadStream.id,
        contentType: req.file.mimetype,
      });

      res.status(201).json({
        message: "Document uploaded successfully",
        document: doc,
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};
