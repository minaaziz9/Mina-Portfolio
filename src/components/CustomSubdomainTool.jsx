import React, { useState } from "react";
import "./CustomSubdomainTool.css"; // Optional for styling, adjust as needed.

const CustomSubdomainTool = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liveCheck, setLiveCheck] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    const apiUrl = `https://subdomain-enum-tool-production-4fb5.up.railway.app/subdomains?domain=${domain}${
      liveCheck ? "&live=true" : ""
    }`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch subdomains");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-subdomain-tool">
      <h2>Subdomain Enumeration Tool</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter a domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={liveCheck}
              onChange={() => setLiveCheck(!liveCheck)}
            />
            Include Live Check
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Subdomains"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && (
        <div>
          <h3>Results for: {results.domain}</h3>
          <p>{results.message}</p>
          <ul>
            {results.subdomains.map((sub, index) => (
              <li key={index}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSubdomainTool;
