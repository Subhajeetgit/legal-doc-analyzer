import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Analyze() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const res = await api.post(`/analysis/${id}/analyze`);
        setAnalysis(res.data.analysis);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Analysis failed (OpenAI quota may be exceeded)."
        );
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const res = await api.get(`/documents/${id}/export-pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `analysis-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to download PDF");
    }
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p>Analyzing document, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="error-box">{error}</div>
          <button onClick={handleDownloadPDF}>
            Download PDF (if available)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ width: "600px" }}>
        <h2>Analysis Result</h2>
        <p className="subtitle">AI-powered legal document insights</p>

        <section style={{ marginBottom: "1rem" }}>
          <h3>Summary</h3>
          <p style={{ fontSize: "0.95rem", color: "#e5e7eb" }}>
            {analysis.summary}
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h3>Key Clauses</h3>
          {analysis.clauses && analysis.clauses.length > 0 ? (
            <ul>
              {analysis.clauses.map((clause, i) => (
                <li key={i}>{clause}</li>
              ))}
            </ul>
          ) : (
            <p>No clauses extracted.</p>
          )}
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h3>Potential Risks</h3>
          {analysis.risks && analysis.risks.length > 0 ? (
            <ul>
              {analysis.risks.map((risk, i) => (
                <li key={i} style={{ color: "#fca5a5" }}>
                  {risk}
                </li>
              ))}
            </ul>
          ) : (
            <p>No risks identified.</p>
          )}
        </section>

        <button onClick={handleDownloadPDF}>Download PDF Report</button>
      </div>
    </div>
  );
}

export default Analyze;
