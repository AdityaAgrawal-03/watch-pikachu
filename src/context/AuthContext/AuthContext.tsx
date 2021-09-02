import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { useNavigate } from "react-router-dom";
import { AuthContextTypes, LoginUser, SignupUser } from "./authContext.types";

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

export function setupAuthHeaderForServiceCalls(token: string) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  return (axios.defaults.headers.common["Authorization"] = null);
}

function setupAuthExceptionHandler(
  logout: () => void,
  navigate: NavigateFunction
) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem("token") as string
  );
  const [token, setToken] = useState(getTokenFromLocalStorage?.token);
  const navigate = useNavigate();

  useEffect(() => {
    setupAuthExceptionHandler(logout, navigate);
  });

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
        setupAuthHeaderForServiceCalls(token);
      }
      return { token, success };
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser: SignupUser = async (username, email, password) => {
    try {
      const {
        data: { success, token },
      } = await axios.post(
        "https://watch-pikachu-backend.aditya365.repl.co/signup",
        {
          username,
          email,
          password,
        }
      );
      if (success) {
        setToken(token);
        localStorage?.setItem("token", JSON.stringify({ token: token }));
        setupAuthHeaderForServiceCalls(token);
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
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, signupUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
