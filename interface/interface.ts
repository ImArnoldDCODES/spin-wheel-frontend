import React, { ReactNode } from "react";
export interface ContextProviderProps {
  children: ReactNode;
}

// user: Array<Object>
interface Giveaway {
  title: string;
  date: string;  // ISO 8601 date string
  winners: string[];
  items: string[];
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  giveaways: Giveaway[];
}


export interface AuthContextType {
  user?: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
}
export interface WheelContextType {
  winner: (name: string, prize: string, giveawayId: string) => void;
}
export interface TableRow {
  name: string;
  date: string;
  number: number;
}
