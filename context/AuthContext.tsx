"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
import useaxios from "../axios";
import {
  AuthContextType,
  AuthProviderProps,
  User,
} from "../interface/interface";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser, "hello");
  }, []);

  const login = async (email: string, password: string) => {
    const res = await useaxios.post("/login", {
      email,
      password,
    });

    const profile = await useaxios.get("/profile", {
      headers: { Authorization: "Bearer " + res.data.token },
    });
    setUser(profile.data);
    localStorage.setItem("user", JSON.stringify(user));
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
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
