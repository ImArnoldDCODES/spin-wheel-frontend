"use client";
import React, { createContext } from "react";
import useaxios from "../axios";
import { ContextProviderProps, WheelContextType } from "../interface/interface";

const WheelContext = createContext<WheelContextType | null>(null);

const WheelProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const winner = async (name: string, prize: string, giveawayId: string) => {
    await useaxios
      .post("/winner", {
        name,
        prize,
        giveawayId,
      })
      .then((res) => localStorage.setItem("token", res.data.token));
  };

  return (
    <WheelContext.Provider value={{ winner }}>{children}</WheelContext.Provider>
  );
};

export { WheelContext, WheelProvider };
