import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, signInWithEmailAndPassword } from "../firebase";
import GoogleOAuthButton from "../components/GoogleOAuthButton";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect already logged-in users to the dashboard
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/setup-organization");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login successful!");
      navigate("/setup-organization");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <ToastContainer />
      <div className="bg-white shadow-lg text-sm rounded-3xl p-8 w-full max-w-md hover:shadow-xl transition duration-300">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Log In
        </h1>

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

        {/* Login Button */}
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full py-2 px-8 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Register Link */}
        <div className="text-center mt-4">
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-600 hover:font-semibold text-sm"
          >
            Don’t have an account? Sign Up
          </Link>
        </div>

        <hr className="my-6" />

        {/* Google Login */}
        <GoogleOAuthButton
          onSuccess={() => navigate("/setup-organization")}
          onFailure={(err) => toast.error(err.message)}
        />
      </div>
    </div>
  );
};

export default Login;
