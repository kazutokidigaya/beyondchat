import scrapeWebsite from "../utils/scraper.js";
import ScrapedData from "../models/ScrapedData.js";
import * as cheerio from "cheerio";

export const scrapeAndSave = async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    // 🔍 Check if data already exists
    const existingData = await ScrapedData.findOne({ url });

    if (existingData) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (new Date(existingData.dateScraped) > oneWeekAgo) {
        return res.json({ message: "Using cached data", data: existingData });
      }
    }

    // 🔍 Scrape fresh data
    const scrapedData = await scrapeWebsite(url);
    if (!scrapedData) {
      return res.status(500).json({ error: "Scraping failed" });
    }

    // ✅ Save/Update in Database
    const updatedData = await ScrapedData.findOneAndUpdate(
      { url },
      {
        $set: {
          title: scrapedData.title,
          text: scrapedData.text,
          dateScraped: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Scraping successful", data: updatedData });
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
};
