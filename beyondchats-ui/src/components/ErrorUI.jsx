import React from "react";

const ErrorUI = ({ checkIntegration }) => {
  return (
    <div className="text-center mt-6 p-4 border rounded-lg bg-red-100">
      <h3 className="text-red-700 text-lg font-semibold">
        ⚠️ Integration Failed!
      </h3>
      <p className="text-gray-700">
        We couldn't detect the chatbot on your website.
      </p>
      <p className="text-gray-700">Try the following:</p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Ensure the script is pasted inside the `` section.</li>
        <li>Check your internet connection.</li>
        <li>Try reloading the page and testing again.</li>
      </ul>
      <div className="mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={checkIntegration}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorUI;
