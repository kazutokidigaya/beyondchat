import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        clearInterval(checkVerification);
        toast.success("✅ Email Verified! Redirecting...");
        setIsChecking(false);
        setTimeout(() => navigate("/setup-organization"), 2000);
      }
    }, 3000);

    return () => clearInterval(checkVerification);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg hover:shadow-xl transition duration-300">
        <div className="flex flex-col items-center text-center">
          {/* Email Icon */}
          <MdEmail className="text-blue-500 text-5xl mb-4" />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-md">
            A verification email has been sent to:
          </p>
          <p className="font-semibold text-gray-900 mt-1">{email}</p>

          {/* Checking Animation */}
          {isChecking && (
            <div className="mt-6 flex flex-col items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-8 w-8 mb-4 animate-spin"></div>
              <p className="text-sm text-gray-500">
                Checking for verification...
              </p>
            </div>
          )}

          {/* Success Message */}
          {!isChecking && (
            <div className="mt-6 flex flex-col items-center text-green-500">
              <FaCheckCircle className="text-4xl mb-2" />
              <p className="text-md font-semibold">Email Verified!</p>
              <p className="text-gray-600 text-sm">Redirecting...</p>
            </div>
          )}

          <p className="text-gray-500 mt-6 text-sm">
            Please check your inbox and click on the verification link. If you
            haven’t received it, check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
