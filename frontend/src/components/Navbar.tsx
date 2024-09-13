import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()!;

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-gray-400">
          Content App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          {user &&
            (user.user.role.name === "admin" ||
              user.user.role.name === "editor") && (
              <Link to="/create-content" className="hover:text-gray-400">
                Create content
              </Link>
            )}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
