import * as cheerio from "cheerio";
import axios from "axios";

const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // ✅ Extract relevant content
    const title = $("title").text().trim();
    const text = $("p")
      .map((i, el) => $(el).text().trim())
      .get()
      .join(" ")
      .slice(0, 500); // Limit text to 500 chars

    return { url, title, text };
  } catch (error) {
    console.error("Scraping Error:", error.message);
    return null;
  }
};

export default scrapeWebsite;
