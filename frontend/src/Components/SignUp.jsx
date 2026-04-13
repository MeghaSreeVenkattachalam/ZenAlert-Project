import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../Styles/SignUp.css';

// Signup component to register new users
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Validate form inputs (name, email, password)
    const validateForm = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Full Name is required";
        } else if (name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be at least 8 characters, with uppercase, lowercase, number & special character";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission and send data to backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        
        try {
            // Send signup request to backend
            await axios.post("http://localhost:8080/api/auth/signup", {
                username: name,
                email,
                password
            });

            alert("Registration Successful! Redirecting to Login...");
            navigate("/login");
        } catch (error) {
            // Handle signup errors
            alert(error.response?.data || error.message || "Error signing up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='signup_section'>
            <form onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>

                <label htmlFor="name">Full Name</label>
                <input 
                    type="text" 
                    value={name} 
                    placeholder="Enter Your Name" 
                    onChange={(event) => setName(event.target.value)} 
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    value={email} 
                    placeholder="Enter Your Email" 
                    onChange={(event) => setEmail(event.target.value)} 
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    value={password} 
                    placeholder="Enter Your Password" 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <div className='register_btn'>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>

                <div className='redirect'>
                    {/* Redirect to login if user already has account */}
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;