import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

export function Signup() {
  const { signupUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { success } = await signupUser(username, email, password);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page-content">
        <div className="signup-form-heading">
          <h1> Signup </h1>
        </div>
        <div className="signup-form">
          <form onSubmit={(e) => signupHandler(e)}>
            <label htmlFor="username" className="label"> Username </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email" className="label"> Email </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              id="email"
              value={email}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="label"> Password </label>
            <input
              type="text"
              placeholder="password"
              name="password"
              id="password"
              value={password}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary btn-signup"> signup </button>
          </form>
        </div>
      </div>
    </div>
  );
}
