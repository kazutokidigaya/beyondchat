import React, { useState } from "react";
import axios from "axios";

const ScrapeWebsite = ({ setScrapedUrl }) => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/scrape/", {
        url,
      });

      setData(response.data.data);
      setScrapedUrl(url);
      setError("");
    } catch (err) {
      setError("Scraping failed. Please check the website URL.");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Enter Website URL
      </h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="https://example.com"
      />
      <button
        onClick={handleScrape}
        className="bg-blue-500 text-white p-2 mt-4 rounded-md w-full hover:bg-blue-600"
      >
        {loading ? "Scraping..." : "Scrape Website"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">Scraped Data</h3>
          <p>
            <strong>URL:</strong> {data.url}
          </p>
          <p>
            <strong>Title:</strong> {data.title}
          </p>
          <button
            className="mt-2 bg-gray-400 text-white px-2 py-1 rounded-lg"
            onClick={() => setViewDetails(!viewDetails)}
          >
            {viewDetails ? "Hide Details" : "View Scraped Content"}
          </button>
          {viewDetails && <p className="text-gray-800 mt-2">{data.text}</p>}
        </div>
      )}
    </div>
  );
};

export default ScrapeWebsite;
