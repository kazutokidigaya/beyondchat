import React from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";

const GoogleOAuthButton = ({ onSuccess, onFailure }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess(result.user);
      navigate("/setup-organization"); // Redirect to setup after login
    } catch (error) {
      onFailure(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center ">
      {/* Google Signup Button */}
      <button
        onClick={handleGoogleLogin}
        className="flex w-full items-center cursor-pointer justify-center gap-4 border border-gray-300 py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300"
      >
        <img
          src="https://res.cloudinary.com/dqela8lj8/image/upload/v1732783718/db9aiwhjxeitnkzjsyza.png"
          alt="Google"
          className="w-6 h-6"
        />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleOAuthButton;
