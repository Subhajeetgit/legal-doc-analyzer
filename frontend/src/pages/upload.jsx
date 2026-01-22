import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Redirect to analysis page using returned document ID
      navigate(`/analyze/${res.data.document._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Upload Legal Document</h2>
        <p className="subtitle">Upload a PDF to analyze clauses and risks</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {file && (
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Selected: {file.name}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
