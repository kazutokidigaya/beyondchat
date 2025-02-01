import Groq from "groq-sdk";
import ScrapedData from "../models/ScrapedData.js";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const trainChatbot = async (req, res) => {
  try {
    // Fetch latest scraped data from MongoDB
    const scrapedData = await ScrapedData.find()
      .sort({ dateScraped: -1 })
      .limit(5);

    if (!scrapedData.length) {
      return res.status(400).json({ error: "No data available for training" });
    }

    // Format the scraped data into context for the chatbot
    const context = scrapedData
      .map((data) => `${data.title}: ${data.text}`)
      .join("\n");

    // Call Groq API to train chatbot
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chatbot trained on the following website content:",
        },
        { role: "user", content: context },
      ],
      model: "llama-3.3-70b-versatile", // You can adjust this model
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    res.json({
      message: "Chatbot trained successfully",
      response: response.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error("Chatbot Training Error:", error.message);
    res.status(500).json({ error: "Chatbot training failed" });
  }
};

export const testChatbot = async (req, res) => {
  try {
    const { url, message } = req.body;
    if (!url || !message) {
      return res.status(400).json({ error: "URL and message are required" });
    }

    // Fetch the most recent scraped data for the given URL
    const scrapedData = await ScrapedData.findOne({ url });

    if (!scrapedData) {
      return res
        .status(404)
        .json({ error: "No scraped data found for this URL" });
    }

    const websiteContext = `Website: ${scrapedData.url} \nTitle: ${scrapedData.title} \nContent: ${scrapedData.text}`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a chatbot trained to answer queries about the following business:\n\n${websiteContext}`,
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 512,
      top_p: 1,
    });

    res.json({
      message: "Chatbot Response",
      response:
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't find an answer.",
    });
  } catch (error) {
    console.error("Chatbot Testing Error:", error);
    res.status(500).json({ error: "Chatbot testing failed" });
  }
};
