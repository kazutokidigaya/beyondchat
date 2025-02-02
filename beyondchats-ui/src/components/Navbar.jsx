import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth";
import { FaSignOutAlt, FaHome } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className=" text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-blue-700 flex items-center space-x-4">
        <FaHome
          className="text-xl  cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BeyondChats
        </h1>
      </div>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-white text-red-500 border border-red-300 hover:font-semibold hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
