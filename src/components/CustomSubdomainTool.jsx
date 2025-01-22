import React, { useState } from "react";
import "./CustomSubdomainTool.css";

const CustomSubdomainTool = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubdomains = async () => {
    if (!domain.trim()) {
      setError("Please enter a valid domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(
        `https://subdomain-enum-tool-production-4fb5.up.railway.app/subdomains?domain=${domain}`
      );
      if (!response.ok) throw new Error("Failed to fetch subdomains");

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      setResults(data); // Store the entire response
    } catch (err) {
      console.error("Error fetching subdomains:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-subdomain-tool">
      <h3>Subdomain Enumeration</h3>
      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={fetchSubdomains} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Subdomains"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div>
          <h4>Results for {results.domain}</h4>
          {results.message && <p>{results.message}</p>}
          {results.subdomains && results.subdomains.length > 0 ? (
            <ul>
              {results.subdomains.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          ) : (
            <p>No subdomains found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSubdomainTool;
