import { ReactNode } from "react";
export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user?: string;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
}