"use client";
import {
  ContextProviderProps,
  ProfileContextType,
  User,
} from "interface/interface";
import React, { createContext, useState } from "react";
import useaxios from "../axios";

const ProfileContext = createContext<ProfileContextType | null>(null);

const ProfileProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<User | any>();

  const profileFunction = () => {
    const sessionToken = sessionStorage.getItem("token");
    
    if (sessionToken) {
      useaxios
        .get("/profile", {
          headers: { Authorization: `Bearer ${sessionToken}` },
        })
        .then((response: { data: { user: User } }) => {
          setProfile(response.data.user);
        })
        .catch((error: any) => {
          console.error("Error fetching profile", error);
        });
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, profileFunction }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
