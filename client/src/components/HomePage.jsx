import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  //to show user info on home page
  const [user, setUser] = useState(null);
  //to fetchuser from local strorage
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {}, //need to send empty object as body for post request
        {
          withCredentials: true,
        },
      );
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 ">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-green-400 to-blue-500 p-8">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={user?.picture}
                  alt={user.name}
                  className="object-cover"
                />
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                <p className="text-blue-100">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-pink-100 to-pink-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-pink-800 mb-4">
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">{user.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
