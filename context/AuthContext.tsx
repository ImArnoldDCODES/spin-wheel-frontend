"use client";
import { AuthContextType, ContextProviderProps } from "interface/interface";
import { useRouter } from "next/navigation";
import React, { createContext } from "react";
import useaxios from "../axios";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    await useaxios
      .post("/login", {
        email,
        password,
      })
      .then(
        (res: { data: { token: string } }) => {
          sessionStorage.setItem('token', res.data.token)
        }
      );
    router.push("/admin/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    await useaxios.post("/register", {
      name,
      email,
      password,
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

