import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

export function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { success } = await loginUser(email, password);

      if (success) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1> Login </h1>
      <div>
        <form onSubmit={(e) => loginHandler(e)}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type={email}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type={password}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
          <button type="submit"> Login </button>
        </form>
      </div>
      <div>
        Not a member yet?{" "}
        <Link to="/signup" className="link">
          {" "}
          Signup{" "}
        </Link>
      </div>
    </>
  );
}
