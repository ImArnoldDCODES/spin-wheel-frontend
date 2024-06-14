import React, { ReactNode } from "react";
export interface ContextProviderProps {
  children: ReactNode;
}

// user: Array<Object>
export interface Giveaway {
  title: string;
  date: string; 
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

export interface ProfileContextType {
  profile: User | any;
}
export interface TableProps {
  headings: string[];
  data: Giveaway[];
}