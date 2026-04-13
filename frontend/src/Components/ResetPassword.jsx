import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";
import '../Styles/Login.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🚫 Block direct access (no token)
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired link 🚫");
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Password validation
  const validatePassword = () => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

    if (!regex.test(password)) {
      toast.error("Weak password ❌ Use strong password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      await API.post("/users/reset-password", {
        token,
        newPassword: password,
      });

      toast.success("Password reset successful ✅");

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      // 🔥 Show backend messages properly
      const msg = err.response?.data;

      if (msg?.includes("expired")) {
        toast.error("Link expired ⏰");
      } else if (msg?.includes("same")) {
        toast.error("Same password not allowed ❌");
      } else if (msg?.includes("Invalid")) {
        toast.error("Invalid link 🚫");
      } else {
        toast.error("Reset failed ❌");
      }
    }
  };

  return (
    <div className="login_section">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ResetPassword;