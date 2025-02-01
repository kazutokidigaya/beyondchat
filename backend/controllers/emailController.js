import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export const sendIntegrationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Chatbot Integration Instructions",
    text: `Hello,\n\nPlease add the following script to your website:\n\n<script src="https://example.com/chatbot.js"></script>\n\nBest,\nBeyondChats Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      message: "Integration instructions sent to developer's email.",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};
