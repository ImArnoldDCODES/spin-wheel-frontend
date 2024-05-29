import { ReactNode } from "react";
export interface ContextProviderProps {
  children: ReactNode;
}

export interface User {
  name: string,
  
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
