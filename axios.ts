import axios from "axios";

const useaxios: any = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:5000/",
});


export default useaxios;