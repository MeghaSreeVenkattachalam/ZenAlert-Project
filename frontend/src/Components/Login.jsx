    import React, { useState } from 'react';
    import '../Styles/Login.css';
    import { Link, useNavigate } from 'react-router-dom';
    import API from "../api"; // API instance for backend communication

    // Login component to authenticate user and store session data
    export const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errors, setErrors] = useState({});
        const [errorMsg, setErrorMsg] = useState("");
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        // Validate email and password fields
        const validateForm = () => {
            let newErrors = {};

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.trim()) {
                newErrors.email = "Email is required";
            } else if (!emailRegex.test(email)) {
                newErrors.email = "Invalid email format";
            }

            if (!password) {
                newErrors.password = "Password is required";
            } else if (password.length < 8) {
                newErrors.password = "Password must be at least 8 characters";
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        // Handle login form submission
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (!validateForm()) return;

            setLoading(true);
            setErrorMsg("");

            try {
                // Send login request to backend
                const response = await API.post("/auth/login", {
                    email,
                    password
                });

                // Store authentication token
                localStorage.setItem("token", response.data.token);

                // Store user ID for future API usage
                localStorage.setItem("userId", response.data.user.id);

                // Store full user object (optional)
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Navigate to main application page after login
                navigate("/mental-wellbeing");

            } catch (error) {
                // Handle login errors
                setErrorMsg(
                    error.response?.data?.message ||
                    error.message ||
                    "Invalid credentials"
                );
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="login_section">
                <form onSubmit={handleSubmit}>
                    <h2>Welcome Back</h2>

                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <div className='login_btn'>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </div>
                    
                    <p>
                        {/* Navigation links for forgot password and signup */}
                        <Link to="/forgot-password">Forgot Password?</Link> |{" "}
                        <Link to="/signup">Create an Account</Link>
                    </p>

                    {/* Display error message if login fails */}
                    {errorMsg && <p className="error">{errorMsg}</p>}
                </form>
            </div>
        );
    };