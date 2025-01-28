import React from "react";

const InstagramLogin = () => {
  const handleLogin = () => {
    // Redirect to backend endpoint for Instagram login
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Login with Instagram
      </button>
    </div>
  );
};

export default InstagramLogin;
