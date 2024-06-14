import { ReactNode } from "react";
export interface ContextProviderProps {
  children: ReactNode;
}
export interface Giveaway {
  title: string;
  date: string;
  winners: Array<object>;
  items: string[];
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  giveaways: Giveaway[];
}

export interface Winner {
  name?: string;
  prize?: string;
}

export interface TableData {
  title?: string;
  date?: string;
  winners?: string[];
  items?: string[];
  _id?: string;
  name?: string;
  prize?: string;
}

export interface TableProps {
  headings: string[];
  data: TableData[];
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
