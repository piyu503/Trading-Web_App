import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        "https://trading-web-app-7jrl.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {

        alert("Login Successful");

        window.location.href =
        "https://main.d34gr18chlppqj.amplifyapp.com";
      }

      else {

        alert(data.message);
      }

    }

    catch (err) {

      console.log(err);
      alert("Something went wrong");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue trading smarter
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don’t have an account?

          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;