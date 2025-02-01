import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const SuccessUI = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="text-center mt-6 p-4 border rounded-lg bg-green-100">
      <h3 className="text-green-700 text-lg font-semibold">
        🎉 Integration Successful!
      </h3>
      <p className="text-gray-700">Your chatbot is now live.</p>
      <div className="mt-4 flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer "
          onClick={() => navigate("/")}
        >
          Explore Admin Panel
        </button>
        <button
          className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 cursor-pointer"
          onClick={() => navigate("/chatbot-integration")}
        >
          Start Talking to Your Chatbot
        </button>
      </div>
    </div>
  );
};

export default SuccessUI;
