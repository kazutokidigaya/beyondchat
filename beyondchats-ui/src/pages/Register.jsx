import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import GoogleOAuthButton from "../components/GoogleOAuthButton";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect already logged-in users to the dashboard
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/setup-organization");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await sendEmailVerification(userCredential.user);
      toast.success("Verification email sent! Please check your inbox.");
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg text-sm rounded-3xl p-8 w-full max-w-md hover:shadow-xl transition duration-300">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Register
        </h1>

        {/* Name Input */}
        <div className="relative mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <FaUser className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          onClick={handleRegister}
          className="w-full py-2 px-8 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-600 hover:font-semibold text-sm"
          >
            Already have an account? Log In
          </Link>
        </div>

        <hr className="my-6" />

        {/* Google Signup */}
        <GoogleOAuthButton
          onSuccess={() => navigate("/setup-organization")}
          onFailure={(err) => toast.error(err.message)}
        />
      </div>
    </div>
  );
};

export default Register;
