import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // Icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make API request to login
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        // Redirect or save token as needed
        const token = response.data.token;
        sessionStorage.setItem("authToken", token);
        navigate('/Home');
        fetchUserDetails();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again later.");
    }
  };

  // Fetch user details after login
  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.get('http://localhost:3000/api/auth/getStudentDetails', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        console.log(response.data.user);
      } else {
        console.log(response.data.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-inputtext p-component"
            style={{ width: '100%' }}
          />
          {errors.email && <small className="error-message" style={{ color: 'red' }}>{errors.email}</small>}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            toggleMask
            className="p-password p-component"
            style={{ width: '100%' }}
          />
          {errors.password && <small className="error-message" style={{ color: 'red' }}>{errors.password}</small>}
        </div>

        <Button label="Login" type="submit" className="p-button p-component p-button-primary" style={{ width: '100%' }} />
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account?{" "}
        <Link to="/signUp" className="toggle-link" style={{ color: "#007BFF", textDecoration: "underline" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
