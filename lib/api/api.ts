import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const TOKEN = process.env.NEXT_PUBLIC_API_URL;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
