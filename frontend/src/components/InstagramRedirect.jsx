import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstagramRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleInstagramRedirect = async () => {
      // Get the 'code' from the query params
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        alert("Authorization code is missing!");
        navigate("/"); // Redirect to home or login page
        return;
      }

      try {
        // Send the authorization code to the backend to exchange it for an access token
        const response = await axios.get(`http://localhost:3000/auth/redirect?code=${code}`);
        const { access_token, user_id } = response.data;

        console.log("Access Token:", access_token);
        console.log("User ID:", user_id);

        // Store the access token in local storage or context (optional)
        localStorage.setItem("instagram_access_token", access_token);

        alert("Login successful!");
        navigate("/dashboard"); // Redirect to the dashboard or another page
      } catch (error) {
        console.error("Error exchanging code for token:", error);
        alert("Failed to login with Instagram.");
        navigate("/");
      }
    };

    handleInstagramRedirect();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p>Processing Instagram login...</p>
    </div>
  );
};

export default InstagramRedirect;
