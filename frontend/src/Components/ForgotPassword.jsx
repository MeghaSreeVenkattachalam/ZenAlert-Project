import React, { useState } from "react";
import API from "../api";
import '../Styles/Login.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/forgot-password", email, {
        headers: { "Content-Type": "text/plain" },
      });

      // ✅ ONLY show message (no navigation)
      toast.success("Reset link sent to your email 📩");

    } catch (err) {
      toast.error("Error sending reset link ❌");
    }
  };

  return (
    <div className="login_section">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;