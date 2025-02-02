import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScrapeWebsite from "../components/ScrapeWebsite";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const SetupOrganization = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrapedUrl, setScrapedUrl] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleProceed = () => {
    if (!scrapedUrl) {
      toast.error("Please scrape a website first!");
      return;
    }
    navigate("/chatbot-integration", { state: { url: scrapedUrl } });
  };

  const handleChange = (e) =>
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });

  const handleFetchMeta = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://beyondchat.onrender.com/api/scrape/",
        {
          url: companyData.website,
        }
      );
      toast.success(`Meta Data Fetched successfully for ${companyData.name}`);
      setCompanyData({ ...companyData, description: response.data.data.text });
    } catch (error) {
      console.error("Failed to fetch website metadata", error);
      toast.error("Error fetching metadata");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6">
        {/* Organization Form (Left Side) */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            Setup Your Organization
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              onChange={handleChange}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="url"
              name="website"
              placeholder="Company Website"
              onChange={handleChange}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full cursor-pointer"
              onClick={handleFetchMeta}
            >
              Auto-Fill Description
            </button>
            {loading ? (
              <div className="flex items-center justify-center p-10 align-middle">
                <div className="py-3 px-6 font-normal text-gray-900 bg-white rounded-lg border-2">
                  Loading Description...
                </div>
              </div>
            ) : (
              <textarea
                name="description"
                placeholder="Company Description"
                value={companyData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 h-40"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Scrape Website Component (Right Side, Disabled Until Form Submission) */}
        <div
          className={`mt-6 md:mt-0 md:ml-6 w-full max-w-lg transition-opacity ${
            isSubmitted ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <ScrapeWebsite setScrapedUrl={setScrapedUrl} />
        </div>

        {isSubmitted && (
          <button
            className="m-4 w-full max-w-lg bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            onClick={handleProceed}
          >
            Proceed to Chatbot Integration
          </button>
        )}
      </div>
    </>
  );
};

export default SetupOrganization;
