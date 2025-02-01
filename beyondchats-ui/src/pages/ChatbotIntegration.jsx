import React, { useState } from "react";
import axios from "axios";
import TrainChatbot from "../components/TrainChatbot";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const ChatbotIntegration = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const chatbotCode = `<script src="https://example.com/chatbot.js"></script>`;
  const location = useLocation();
  const url = location.state?.url || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(chatbotCode);
    toast.info("Chatbot integration script copied to clipboard!");
  };

  const testChatbot = async () => {
    if (!userQuestion) {
      toast.error("Please enter a question for the chatbot.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/chatbot/test",
        { url: url, message: userQuestion }
      );
      setChatbotResponse(response.data.response);
    } catch (error) {
      console.error("Chatbot test failed:", error);
      toast.error("Chatbot test failed");
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/email/send-integration-email",
        { email }
      );
      setEmailSent(true);
      toast.success("Integration instructions sent successfully.");
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("Email sending failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 min-h-screen bg-gray-100 p-6">
        {/* Left Section: Chatbot Training & Testing */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Chatbot Integration
          </h2>

          {/* Train Chatbot Section */}
          <TrainChatbot setIsSubmitted={setIsSubmitted} />

          {/* Test Chatbot */}
          <div className="my-4">
            <input
              type="text"
              placeholder="Ask a question about the business..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2 cursor-pointer"
              onClick={testChatbot}
            >
              Ask Chatbot
            </button>
          </div>

          {chatbotResponse && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <strong>Chatbot Says:</strong>
              <p className="text-gray-800">{chatbotResponse}</p>
            </div>
          )}
        </div>

        {/* Right Section: Integration Instructions */}

        <div
          className={`flex-1 bg-white p-6 rounded-lg shadow-lg transition-opacity ${
            isSubmitted ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">
            Integrate on Your Website
          </h3>
          <p className="text-gray-600">
            Copy and paste the following script inside your website's{" "}
            <code>&lt;head&gt;</code>:
          </p>
          <div className="bg-gray-100 p-2 rounded text-sm mt-2 overflow-x-auto">
            <code>{chatbotCode}</code>
          </div>
          <button
            className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            onClick={handleCopy}
          >
            Copy Code
          </button>

          {/* Email Integration Instructions */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter developer email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <button
              className="w-full mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer"
              onClick={handleSendEmail}
            >
              Send Email Instructions
            </button>
          </div>
          {emailSent && (
            <p className="text-green-600 mt-2">
              Instructions sent successfully.
            </p>
          )}

          {/* New: Test Integration Button */}
          <button
            className="w-full mt-6 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 cursor-pointer"
            onClick={() => navigate("/test-integration")}
          >
            Test Integration
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotIntegration;
