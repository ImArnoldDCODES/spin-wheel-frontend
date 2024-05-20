import axios from "axios";

const useaxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default useaxios;
