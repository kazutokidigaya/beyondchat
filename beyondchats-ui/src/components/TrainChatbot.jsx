import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TrainChatbot = ({ setIsSubmitted }) => {
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState("");

  const handleTrain = async () => {
    try {
      const res = await axios.post(
        "https://beyondchat.onrender.com/api/chatbot/train"
      );
      setStatus("Training Completed");
      toast.success("Chatbot trained successfully");
      setIsSubmitted(true);
      setResponse(res.data.response); // Store chatbot's trained response
    } catch (error) {
      setStatus("Training Failed");
      toast.error("Training Failed");
      console.error("Chatbot Training Error:", error);
    }
  };

  return (
    <div className="my-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="font-semibold">Train Chatbot</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2 cursor-pointer"
        onClick={handleTrain}
      >
        Train Chatbot
      </button>
      {status && <p className="text-green-600 mt-2">{status}</p>}
      {response && (
        <div className="mt-2 p-2 border rounded-lg bg-white">
          <strong>Chatbot Response:</strong>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default TrainChatbot;
