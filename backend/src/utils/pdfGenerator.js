import PDFDocument from "pdfkit";

export const generateAnalysisPDF = (documentData) => {
  const { filename, analysis } = documentData;

  const doc = new PDFDocument({ margin: 50 });
  const chunks = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

 
  doc
    .fontSize(20)
    .text("Legal Document Analysis Report", { align: "center" })
    .moveDown();

  // File name
  doc
    .fontSize(12)
    .text(`Original File: ${filename}`)
    .moveDown();

  // Summary
  doc
    .fontSize(16)
    .text("Summary")
    .moveDown(0.5);

  doc
    .fontSize(12)
    .text(analysis?.summary || "No summary available")
    .moveDown();

  // Clauses
  doc
    .fontSize(16)
    .text("Key Clauses")
    .moveDown(0.5);

  if (analysis?.clauses?.length) {
    analysis.clauses.forEach((clause, index) => {
      doc.fontSize(12).text(`${index + 1}. ${clause}`);
    });
  } else {
    doc.fontSize(12).text("No clauses extracted");
  }

  doc.moveDown();

  // Risks
  doc
    .fontSize(16)
    .text("Potential Risks")
    .moveDown(0.5);

  if (analysis?.risks?.length) {
    analysis.risks.forEach((risk, index) => {
      doc.fontSize(12).text(`${index + 1}. ${risk}`);
    });
  } else {
    doc.fontSize(12).text("No risks identified");
  }

  doc.end();

  return Buffer.concat(chunks);
};
