import React, { useState } from "react";
import SuccessUI from "../components/SuccessUI";
import ErrorUI from "../components/ErrorUI";
import Navbar from "../components/Navbar";

const TestIntegration = () => {
  const [integrationSuccess, setIntegrationSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkIntegration = () => {
    setLoading(true);

    // Simulating integration check delay
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setIntegrationSuccess(isSuccess);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Test Chatbot Integration
          </h2>

          {/* Check Integration Button */}
          <button
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={checkIntegration}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Integration"}
          </button>

          {/* Show Loading Indicator */}
          {loading && (
            <div className="mt-4 text-gray-500 text-sm animate-pulse">
              Checking integration...
            </div>
          )}

          {/* Show Success or Error UI based on result */}
          <div className="mt-6 ">
            {integrationSuccess === true && <SuccessUI />}
            {integrationSuccess === false && <ErrorUI />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestIntegration;
