"use client";
import { ContextProviderProps, WheelContextType } from "interface/interface";
import React, { createContext } from "react";
import useaxios from "../axios";

const WheelContext = createContext<WheelContextType | null>(null);

const WheelProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const winner = async (name: string, prize: string, giveawayId: string) => {
    await useaxios
      .patch("/winner", {
        name,
        prize,
        giveawayId,
      })
      .then((res: { data: { token: string } }) => localStorage.setItem("token", res.data.token));
  };

  return (
    <WheelContext.Provider value={{ winner }}>{children}</WheelContext.Provider>
  );
};

export { WheelContext, WheelProvider };

