import React, { useState } from "react";
import SuccessUI from "./SuccessUI";
import ErrorUI from "../components/ErrorUI";

const TestIntegration = () => {
  const [integrationSuccess, setIntegrationSuccess] = useState(null);

  const checkIntegration = () => {
    // Simulating integration check (50% chance success/fail)
    const isSuccess = Math.random() > 0.5;
    setIntegrationSuccess(isSuccess);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Test Chatbot Integration</h2>

      {/* Check Integration Button */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={checkIntegration}
      >
        Check Integration
      </button>

      {/* Show Success or Error UI based on result */}
      {integrationSuccess === true && <SuccessUI />}
      {integrationSuccess === false && <ErrorUI />}
    </div>
  );
};

export default TestIntegration;
