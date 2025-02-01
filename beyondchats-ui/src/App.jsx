import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EmailVerification from "./components/EmailVerification";
import SetupOrganization from "./pages/SetupOrganization";
import ChatbotIntegration from "./pages/ChatbotIntegration";
import TestIntegration from "./pages/TestIntegration";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* PROTECTED ROUTES: Only Logged-in Users Can Access */}
        <Route
          path="/setup-organization"
          element={
            <ProtectedRoute>
              <SetupOrganization />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot-integration"
          element={
            <ProtectedRoute>
              <ChatbotIntegration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test-integration"
          element={
            <ProtectedRoute>
              <TestIntegration />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
