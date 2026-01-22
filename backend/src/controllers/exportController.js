import Document from "../models/Document.js";
import { generateAnalysisPDF } from "../utils/pdfGenerator.js";

export const exportAnalysisPDF = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (!document.analysis || !document.analysis.summary) {
      return res.status(400).json({
        message: "Document has not been analyzed yet",
      });
    }

    const pdfBuffer = generateAnalysisPDF(document);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="analysis-${document._id}.pdf"`
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to export PDF" });
  }
};
