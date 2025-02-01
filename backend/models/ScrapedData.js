import mongoose from "mongoose";

const ScrapedDataSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  text: { type: String },
  dateScraped: { type: Date, default: Date.now },
});

const ScrapedData = mongoose.model("ScrapedData", ScrapedDataSchema);
export default ScrapedData;
