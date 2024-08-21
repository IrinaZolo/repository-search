import axios from "axios";

export const baseRequester = axios.create({
  baseURL: "https://api.github.com/graphql",
  // baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
