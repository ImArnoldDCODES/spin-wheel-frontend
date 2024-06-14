import axios from "axios";

const useaxios: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default useaxios;
