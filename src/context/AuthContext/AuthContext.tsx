import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextTypes, LoginUser, SignupUser  } from "./authContext.types";


export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem("token") as string
  );
  console.log({ getTokenFromLocalStorage });
  const [token, setToken] = useState(getTokenFromLocalStorage?.token);
  const navigate = useNavigate();

  const loginUser: LoginUser = async (email, password) => {
    try {
      const {
        data: { success, token },
      } = await axios.post(
        "https://watch-pikachu-backend.aditya365.repl.co/login",
        {
          email,
          password,
        }
      );

      if (success) {
        setToken(token);
        localStorage?.setItem("token", JSON.stringify({ token: token }));
      }
      return {token, success};
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser: SignupUser = async (username, email, password) => {
    try {
      const { data: { success, token } } = await axios.post("https://watch-pikachu-backend.aditya365.repl.co/signup", {
        username,
        email,
        password
      })
      if (success) {
        setToken(token);
        localStorage?.setItem("token", JSON.stringify({ token: token }))
      }
      return { success, token };
    } catch (error) {
      console.error(error);
      
    }
  };

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("token");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ token, loginUser, signupUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
