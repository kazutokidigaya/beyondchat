import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 align-middle">
        <div className="py-3 px-6 font-normal text-gray-900 bg-white rounded-lg border-2">
          Loading Please wait...
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
