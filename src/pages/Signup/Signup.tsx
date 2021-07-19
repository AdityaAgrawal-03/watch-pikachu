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
    <>
      <h1> Signup </h1>
      <form onSubmit={(e) => signupHandler(e)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email"> email </label>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password"> password </label>
        <input
          type="text"
          placeholder="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> signup </button>
      </form>
    </>
  );
}
