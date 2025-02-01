import React, { useState } from "react";

const dummyScrapedPages = [
  {
    url: "https://example.com/home",
    status: "Scraped",
    data: ["Welcome", "About us"],
  },
  { url: "https://example.com/services", status: "Pending", data: [] },
];

const WebpageScraperStatus = () => {
  const [scrapedPages, setScrapedPages] = useState(dummyScrapedPages);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Webpage Scraper Status</h2>
      <ul>
        {scrapedPages.map((page, index) => (
          <li key={index} className="my-2 p-3 border rounded-lg">
            <p>
              <strong>URL:</strong> {page.url}
            </p>
            <p>
              <strong>Status:</strong> {page.status}
            </p>
            {page.data.length > 0 && (
              <details>
                <summary className="cursor-pointer text-blue-600">
                  View Data
                </summary>
                <ul className="ml-4">
                  {page.data.map((chunk, i) => (
                    <li key={i}>{chunk}</li>
                  ))}
                </ul>
              </details>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebpageScraperStatus;
